
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ClipboardIcon, SparkleIcon } from '../components/Icons';
import { ClipboardPasteArea } from '../components/ClipboardPasteArea';
import { ImagePreview } from '../components/ImagePreview';
import { ImageModal } from '../components/ImageModal';

interface ImageData {
  url: string;
  base64: string;
  mimeType: string;
}

// Helper to convert a blob to a base64 string
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve((reader.result as string).split(',')[1]);
      } else {
        reject(new Error("Failed to read blob as base64."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ExtractorPage: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const base64 = await blobToBase64(file);
        const url = URL.createObjectURL(file);
        setImageData({ url, base64, mimeType: file.type });
        setExtractedText('');
        setError('');
        setCopySuccess('');
      } catch (e) {
        setError('Could not process the image file.');
        console.error(e);
      }
    } else if (file) {
      setError('Please upload a valid image file.');
    }
  }, []);

  const handleClear = () => {
    if (imageData) {
        URL.revokeObjectURL(imageData.url);
    }
    setImageData(null);
    setExtractedText('');
    setError('');
    setCopySuccess('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  // Drag and Drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.includes('image')) {
          const blob = item.getAsFile();
          if(blob) handleFile(blob);
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  const handleExtract = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setError('');
    setExtractedText('');
    setCopySuccess('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const imagePart = { inlineData: { data: base64, mimeType }};
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [
            imagePart,
            { text: 'Extract all text from this image. Only return the extracted text, without any additional formatting or commentary.' }
        ]},
      });
      setExtractedText(response.text.trim());
    } catch (err) {
      console.error(err);
      setError('Failed to extract text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText).then(() => {
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
      }, () => {
        setCopySuccess('Failed to copy.');
      });
    }
  };

  return (
    <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
        {isModalOpen && imageData && (
            <ImageModal imageUrl={imageData.url} onClose={() => setIsModalOpen(false)} />
        )}
        <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 !leading-snug">Image-to-Text Extractor</h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Paste, drop, or upload an image to instantly extract its text with AI. Crop to select a specific area.
                </p>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                {!imageData ? (
                    <ClipboardPasteArea 
                        onUploadClick={() => fileInputRef.current?.click()}
                        isDragging={isDragging}
                    />
                ) : (
                    <ImagePreview 
                        imageData={imageData}
                        onImageClick={() => setIsModalOpen(true)}
                        onClear={handleClear}
                        onExtract={handleExtract}
                        isLoading={isLoading}
                    />
                )}
                
                {imageData && (
                    <div className="w-full h-full">
                        <div className="relative bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 min-h-[400px] shadow-lg dark:shadow-brand-blue/10 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-3">
                                    <SparkleIcon className="w-6 h-6 text-brand-primary" />
                                    <span>Extracted Text</span>
                                </h2>
                                {extractedText && !isLoading && (
                                    <button onClick={handleCopyToClipboard} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                                        <ClipboardIcon className="w-5 h-5"/>
                                        <span>Copy</span>
                                    </button>
                                )}
                            </div>
                            {copySuccess && <div className="absolute top-5 right-24 text-sm text-green-500 animate-fade-in">{copySuccess}</div>}
                            <div className="flex-grow w-full h-full text-gray-700 dark:text-gray-300 overflow-y-auto whitespace-pre-wrap bg-gray-50 dark:bg-dark-bg/50 rounded-lg p-4 min-h-[200px]">
                                {isLoading ? (
                                    <div className="space-y-3 animate-pulse">
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                    </div>
                                ) : extractedText ? (
                                    extractedText
                                ) : (
                                    <p className="text-gray-400 dark:text-gray-500">Your extracted text will appear here once processing is complete.</p>
                                )}
                            </div>
                             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        </div>
                    </div>
                )}
            </div>
        </main>
    </div>
  );
};

export default ExtractorPage;
