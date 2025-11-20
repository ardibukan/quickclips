import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { jsPDF } from "jspdf";
import { ClipboardPasteArea } from './ClipboardPasteArea';
import { InvoiceIcon, ReportIcon, ResumeIcon, SparkleIcon, DownloadIcon, XCircleIcon } from './Icons';

type Template = 'invoice' | 'report' | 'resume';
interface ImageData { url: string; base64: string; mimeType: string; }

const templates: { id: Template; name: string; icon: React.FC<{className?: string}>; description: string; }[] = [
    { id: 'invoice', name: 'Invoice', icon: InvoiceIcon, description: 'Organize billing details into a professional invoice format.' },
    { id: 'report', name: 'Business Report', icon: ReportIcon, description: 'Structure key points and data into a formal report.' },
    { id: 'resume', name: 'Resume', icon: ResumeIcon, description: 'Format experience and skills into a clean, modern resume.' },
];

//#region Schemas
const invoiceSchema = {
    type: Type.OBJECT,
    properties: {
        from: { type: Type.STRING, description: "The sender's name and address." },
        billTo: { type: Type.STRING, description: "The recipient's name and address." },
        invoiceNumber: { type: Type.STRING },
        date: { type: Type.STRING },
        items: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING },
                    quantity: { type: Type.NUMBER },
                    price: { type: Type.NUMBER },
                },
                required: ['description', 'quantity', 'price'],
            }
        },
        total: { type: Type.NUMBER, description: "The total amount due." },
    },
    required: ['from', 'billTo', 'invoiceNumber', 'date', 'items', 'total'],
};

const reportSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        introduction: { type: Type.STRING },
        sections: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    heading: { type: Type.STRING },
                    content: { type: Type.STRING },
                },
                required: ['heading', 'content'],
            }
        },
        conclusion: { type: Type.STRING },
    },
    required: ['title', 'introduction', 'sections', 'conclusion'],
};

const resumeSchema = {
    type: Type.OBJECT,
    properties: {
        contact: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
            },
            required: ['name', 'phone', 'email'],
        },
        summary: { type: Type.STRING },
        experience: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    company: { type: Type.STRING },
                    role: { type: Type.STRING },
                    dates: { type: Type.STRING },
                    description: { type: Type.STRING },
                },
                required: ['company', 'role', 'dates', 'description'],
            }
        },
        education: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    school: { type: Type.STRING },
                    degree: { type: Type.STRING },
                    dates: { type: Type.STRING },
                },
                required: ['school', 'degree', 'dates'],
            }
        },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['contact', 'summary', 'experience', 'education', 'skills'],
};
//#endregion

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => reader.result ? resolve((reader.result as string).split(',')[1]) : reject(new Error("Failed to read blob as base64."));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const getTemplatePromptAndSchema = (template: Template, text: string) => {
    const basePrompt = `Based on the following extracted text, populate the provided JSON schema. Ensure all fields are filled accurately. Extracted text:\n---\n${text}\n---`;
    switch (template) {
        case 'invoice': return { prompt: basePrompt, schema: invoiceSchema };
        case 'report': return { prompt: basePrompt, schema: reportSchema };
        case 'resume': return { prompt: basePrompt, schema: resumeSchema };
    }
}

//#region PDF Generators
const generateInvoicePdf = (data: any): jsPDF => {
    const doc = new jsPDF();
    const brandColor = '#4a80ff';
    const lightGray = '#f3f4f6';
    const darkGray = '#374151';
    const pageHeight = doc.internal.pageSize.height;
    
    // Header
    doc.setFillColor(brandColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(24).setFont('helvetica', 'bold').setTextColor('#ffffff');
    doc.text('QuickClips Inc.', 15, 18);
    
    // Invoice Title
    doc.setFontSize(36).setFont('helvetica', 'bold').setTextColor(darkGray);
    doc.text('INVOICE', 200, 45, { align: 'right' });

    // Invoice Details
    doc.setFontSize(10).setFont('helvetica', 'normal').setTextColor(darkGray);
    doc.text(`Invoice #: ${data.invoiceNumber || 'N/A'}`, 200, 55, { align: 'right' });
    doc.text(`Date Created: ${data.date || new Date().toLocaleDateString()}`, 200, 60, { align: 'right' });

    // Billing Info
    let y = 75;
    doc.setFontSize(11).setFont('helvetica', 'bold');
    doc.text('FROM:', 15, y);
    doc.setFont('helvetica', 'normal');
    const fromLines = doc.splitTextToSize(data.from || 'QuickClips Inc.\n123 AI Avenue, Tech City, 12345', 80);
    doc.text(fromLines, 15, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 110, y);
    doc.setFont('helvetica', 'normal');
    const billToLines = doc.splitTextToSize(data.billTo || '', 80);
    doc.text(billToLines, 110, y + 5);
    
    y += Math.max(fromLines.length, billToLines.length) * 5 + 15;

    // Table Header
    doc.setFillColor(darkGray);
    doc.rect(15, y, 185, 10, 'F');
    doc.setFont('helvetica', 'bold').setTextColor('#ffffff').setFontSize(11);
    doc.text('DESCRIPTION', 20, y + 7);
    doc.text('QTY', 130, y + 7);
    doc.text('UNIT PRICE', 150, y + 7);
    doc.text('TOTAL', 180, y + 7);
    y += 10;

    // Table Items
    doc.setFont('helvetica', 'normal').setTextColor(darkGray).setFontSize(10);
    (data.items || []).forEach((item: any, index: number) => {
        const itemTotal = (item.quantity || 0) * (item.price || 0);
        const descriptionLines = doc.splitTextToSize(item.description || '', 100);
        const rowHeight = descriptionLines.length * 5 + 4;

        if (y + rowHeight > pageHeight - 50) {
            doc.addPage();
            y = 20;
        }

        if (index % 2 !== 0) {
            doc.setFillColor(lightGray);
            doc.rect(15, y, 185, rowHeight, 'F');
        }
        
        doc.text(descriptionLines, 20, y + 5);
        doc.text(String(item.quantity || '0'), 135, y + 5, { align: 'center' });
        doc.text(`$${(item.price || 0).toFixed(2)}`, 160, y + 5, { align: 'center' });
        doc.text(`$${itemTotal.toFixed(2)}`, 190, y + 5, { align: 'right' });
        y += rowHeight;
    });

    // Total
    y += 10;
    doc.setFont('helvetica', 'bold').setFontSize(14);
    doc.text('TOTAL AMOUNT DUE:', 140, y, { align: 'right' });
    doc.setFontSize(16).setTextColor(brandColor);
    doc.text(`$${(data.total || 0).toFixed(2)}`, 190, y, { align: 'right' });

    // Footer
    const footerY = pageHeight - 35;
    doc.setDrawColor(brandColor).setLineWidth(0.5);
    doc.line(15, footerY, 195, footerY);
    doc.setFontSize(10).setTextColor(darkGray);
    doc.text('Thank you for your business!', 105, footerY + 10, { align: 'center' });
    doc.text('123 AI Avenue, Tech City | contact@quickclips.dev', 105, footerY + 15, { align: 'center' });

    // Signature
    doc.line(140, footerY - 15, 195, footerY - 15);
    doc.text('Authorized Signature', 142, footerY - 10);

    return doc;
};

const generateReportPdf = (data: any): jsPDF => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFont('helvetica', 'bold').setFontSize(24).text(data.title || 'Report', 105, y, { align: 'center' });
    y += 20;
    doc.setFontSize(14).text('Introduction', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal').setFontSize(12);
    const introLines = doc.splitTextToSize(data.introduction || '', 170);
    doc.text(introLines, 20, y);
    y += introLines.length * 5 + 10;

    (data.sections || []).forEach((section: any) => {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFont('helvetica', 'bold').setFontSize(14).text(section.heading || '', 20, y);
        y += 8;
        doc.setFont('helvetica', 'normal').setFontSize(12);
        const contentLines = doc.splitTextToSize(section.content || '', 170);
        doc.text(contentLines, 20, y);
        y += contentLines.length * 5 + 10;
    });

    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold').setFontSize(14).text('Conclusion', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal').setFontSize(12);
    const conclusionLines = doc.splitTextToSize(data.conclusion || '', 170);
    doc.text(conclusionLines, 20, y);

    return doc;
};

const generateResumePdf = (data: any): jsPDF => {
    const doc = new jsPDF();
    const { contact, summary, experience, education, skills } = data;
    const pageHeight = doc.internal.pageSize.height;
    const pageMargin = 20;
    let y = 25;

    const printWrappedText = (text: string, x: number, yPos: number, maxWidth: number, fontStyle: 'normal' | 'bold' = 'normal', fontSize: number = 10): number => {
        if (!text) return yPos;
        doc.setFont('helvetica', fontStyle).setFontSize(fontSize);
        const lines = doc.splitTextToSize(text.trim(), maxWidth);
        if (yPos + lines.length * 5 > pageHeight - pageMargin) {
            doc.addPage();
            yPos = pageMargin;
        }
        doc.text(lines, x, yPos);
        return yPos + lines.length * 5;
    };

    // Header
    doc.setFont('helvetica', 'bold').setFontSize(28).setTextColor('#374151');
    doc.text(contact?.name || '', 105, y, { align: 'center' });
    y += 10;
    doc.setFont('helvetica', 'normal').setFontSize(12).setTextColor('#6b7280');
    doc.text(`${contact?.phone || ''}  |  ${contact?.email || ''}`, 105, y, { align: 'center' });
    y += 10;
    doc.setDrawColor('#e5e7eb').setLineWidth(0.5);
    doc.line(pageMargin, y, 210 - pageMargin, y);
    y += 12;

    // Summary
    doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor('#374151');
    doc.text('Professional Summary', pageMargin, y);
    y += 7;
    y = printWrappedText(summary, pageMargin, y, 170, 'normal', 11);
    y += 12;

    // Experience
    doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor('#374151');
    doc.text('Work Experience', pageMargin, y);
    y += 7;
    (experience || []).forEach((exp: any) => {
        doc.setFont('helvetica', 'bold').setFontSize(12);
        doc.text(exp.role || '', pageMargin, y);
        doc.setFont('helvetica', 'normal').setFontSize(11);
        doc.text(exp.dates || '', 210 - pageMargin, y, { align: 'right' });
        y += 6;
        doc.setFont('helvetica', 'italic').setTextColor('#6b7280');
        doc.text(exp.company || '', pageMargin, y);
        y += 6;
        y = printWrappedText(`• ${exp.description?.replace(/\n/g, '\n• ')}` || '', pageMargin + 2, y, 168);
        y += 8;
    });

    // Education
    doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor('#374151');
    doc.text('Education', pageMargin, y);
    y += 7;
    (education || []).forEach((edu: any) => {
        doc.setFont('helvetica', 'bold').setFontSize(12);
        doc.text(edu.degree || '', pageMargin, y);
        doc.setFont('helvetica', 'normal').setFontSize(11);
        doc.text(edu.dates || '', 210 - pageMargin, y, { align: 'right' });
        y += 6;
        doc.setFont('helvetica', 'normal').setTextColor('#6b7280');
        doc.text(edu.school || '', pageMargin, y);
        y += 8;
    });

    // Skills
    doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor('#374151');
    doc.text('Skills', pageMargin, y);
    y += 7;
    const skillText = (skills || []).join('  •  ');
    y = printWrappedText(skillText, pageMargin, y, 170);
    
    return doc;
};
//#endregion

export const TemplateGenerator: React.FC = () => {
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [generatedPdf, setGeneratedPdf] = useState<jsPDF | null>(null);
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingStep, setLoadingStep] = useState<'extracting' | 'generating' | ''>('');
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(async (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            try {
                const base64 = await blobToBase64(file);
                const url = URL.createObjectURL(file);
                setImageData({ url, base64, mimeType: file.type });
                setError('');
                setPdfPreviewUrl(null);
                setGeneratedPdf(null);
            } catch (e) {
                setError('Could not process the image file.');
            }
        } else if (file) {
            setError('Please upload a valid image file.');
        }
    }, []);

    const handleClear = () => {
        if (imageData) URL.revokeObjectURL(imageData.url);
        setImageData(null);
        setSelectedTemplate(null);
        setPdfPreviewUrl(null);
        setGeneratedPdf(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleClosePreview = () => {
        setPdfPreviewUrl(null);
        setGeneratedPdf(null);
    };
    
    const handleGenerate = async () => {
        if (!imageData || !selectedTemplate) return;

        setIsLoading(true);
        setError('');
        setPdfPreviewUrl(null);
        setGeneratedPdf(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            setLoadingStep('extracting');
            const imagePart = { inlineData: { data: imageData.base64, mimeType: imageData.mimeType } };
            const extractResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, { text: 'Extract all text from this image.' }] },
            });
            const extractedText = extractResponse.text.trim();
            if(!extractedText) throw new Error("Could not extract any text from the image.");

            setLoadingStep('generating');
            const { prompt, schema } = getTemplatePromptAndSchema(selectedTemplate, extractedText);
            const generateResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema: schema },
            });
            const jsonData = JSON.parse(generateResponse.text);

            let doc;
            switch (selectedTemplate) {
                case 'invoice': doc = generateInvoicePdf(jsonData); break;
                case 'report': doc = generateReportPdf(jsonData); break;
                case 'resume': doc = generateResumePdf(jsonData); break;
                default: throw new Error("Invalid template selected");
            }
            setGeneratedPdf(doc);
            setPdfPreviewUrl(doc.output('datauristring'));

        } catch (err) {
            console.error(err);
            setError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
            setLoadingStep('');
        }
    };
    
    const handleDownloadPdf = () => {
        if (!generatedPdf || !selectedTemplate) return;
        generatedPdf.save(`${selectedTemplate}.pdf`);
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
            <input type="file" ref={fileInputRef} onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} className="hidden" accept="image/png, image/jpeg, image/webp" />
            
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-text-heading-light dark:text-text-heading-dark"><span className="font-bold text-brand-primary">1.</span> Upload Document Image</h2>
                    {!imageData ? (
                        <ClipboardPasteArea onUploadClick={() => fileInputRef.current?.click()} isDragging={isDragging} />
                    ) : (
                        <div className="relative group">
                            <img src={imageData.url} alt="Uploaded document" className="w-full rounded-lg shadow-md max-h-[400px] object-contain bg-gray-100 dark:bg-gray-900" />
                            <button onClick={handleClear} className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100" aria-label="Remove image">
                                <XCircleIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-text-heading-light dark:text-text-heading-dark"><span className="font-bold text-brand-primary">2.</span> Select a Template</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {templates.map(template => (
                            <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedTemplate === template.id ? 'border-brand-primary bg-brand-primary/10 shadow-lg' : 'border-gray-300 dark:border-gray-700 hover:border-brand-primary/50 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}>
                                <template.icon className={`w-8 h-8 mb-2 ${selectedTemplate === template.id ? 'text-brand-primary' : 'text-gray-500'}`} />
                                <h3 className="font-semibold text-text-heading-light dark:text-text-heading-dark">{template.name}</h3>
                                <p className="text-sm text-text-body-light dark:text-text-body-dark">{template.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <button onClick={handleGenerate} disabled={!imageData || !selectedTemplate || isLoading} className="w-full font-bold py-4 px-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg focus:ring-brand-primary rounded-full text-white dark:text-black bg-brand-gradient bg-200% 
                    md:hover:shadow-lg md:hover:shadow-brand-secondary/40 hover:scale-105 md:animate-gradient-shift disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100">
                        {isLoading ? (<span className="capitalize">{loadingStep}...</span>) : (<span className="flex items-center justify-center gap-2"><SparkleIcon className="w-5 h-5"/> Generate Document</span>)}
                    </button>
                </div>
            </div>

            <div className="relative bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10 flex flex-col min-h-[500px] lg:min-h-0">
                <h2 className="text-2xl font-semibold mb-4 text-text-heading-light dark:text-text-heading-dark"><span className="font-bold text-brand-primary">3.</span> Preview & Download</h2>
                <div className="flex-grow w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg/50 rounded-lg p-1">
                    {isLoading ? (
                        <div className="text-center">
                            <SparkleIcon className="w-12 h-12 text-brand-primary animate-pulse mx-auto" />
                            <p className="mt-4 text-lg font-semibold capitalize">{loadingStep}...</p>
                        </div>
                    ) : pdfPreviewUrl ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-2 px-3">
                                <h3 className="text-lg font-semibold">Document Preview</h3>
                                <button onClick={handleClosePreview} className="p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" aria-label="Close Preview">
                                    <XCircleIcon className="w-6 h-6"/>
                                </button>
                            </div>
                            <iframe src={pdfPreviewUrl} className="w-full flex-grow rounded-md border border-gray-200 dark:border-gray-700" title="PDF Preview" />
                            <button onClick={handleDownloadPdf} className="w-full mt-4 font-bold py-3 px-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-card dark:focus:ring-offset-dark-card focus:ring-brand-primary rounded-full text-white bg-brand-blue hover:opacity-90 flex items-center justify-center gap-2 mx-auto">
                                <DownloadIcon className="w-5 h-5" />
                                Download PDF
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-center">Your generated document preview will appear here.</p>
                    )}
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};