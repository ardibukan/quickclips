
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DownloadIcon, QrCodeIcon } from '../components/Icons';

const QrGeneratorPage: React.FC = () => {
  const [text, setText] = useState('');
  const [qrData, setQrData] = useState<string | null>(null);

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        generateQR(text);
      }, 300);
      return () => clearTimeout(timer);
    } else {
        setQrData(null);
    }
  }, [text]);

  const generateQR = async (input: string) => {
    try {
      const url = await QRCode.toDataURL(input, {
        width: 400,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrData(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (qrData) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-brand-blue to-purple-600 !leading-snug">
                QR Code Generator
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Instantly generate high-quality QR codes for your links. Just paste and download.
            </p>
        </div>

        {/* Generator Card */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Input Section */}
            <div className="space-y-6">
                <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
                    <label htmlFor="url-input" className="block text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                        Enter your URL
                    </label>
                    <div className="relative">
                         <input
                            id="url-input"
                            type="text"
                            placeholder="https://example.com"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-xl py-3 px-4 pl-12 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                         />
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                             <QrCodeIcon className="w-5 h-5" />
                         </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Your QR code will generate automatically as you type.
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col items-center justify-center">
                <div className={`relative bg-white p-4 rounded-3xl shadow-2xl transition-all duration-500 ${qrData ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
                     {/* Background glow */}
                     {qrData && <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-purple-600 rounded-3xl blur opacity-30"></div>}
                     
                     <div className="relative bg-white rounded-2xl p-2">
                        {qrData ? (
                             <img src={qrData} alt="Generated QR Code" className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-lg" />
                        ) : (
                            <div className="w-64 h-64 md:w-72 md:h-72 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                                <QrCodeIcon className="w-16 h-16 text-gray-300" />
                            </div>
                        )}
                     </div>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={!qrData}
                    className="mt-8 flex items-center space-x-2 bg-brand-blue text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-blue/20"
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download QR Code</span>
                </button>
            </div>
        </div>
    </main>
  );
};

export default QrGeneratorPage;
