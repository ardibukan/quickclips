
import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';

interface ImageData {
  url: string;
  base64: string;
  mimeType: string;
}

interface ImagePreviewProps {
  imageData: ImageData;
  onImageClick: () => void;
  onClear: () => void;
  onExtract: (base64: string, mimeType: string) => Promise<void>;
  isLoading: boolean;
}

// Utility to get the cropped image data as a base64 string
function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
  originalMimeType: string
): Promise<{ base64: string, mimeType: string }> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // Crop values are in pixels on the displayed image. We need to scale them up for the original resolution.
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    if (cropWidth === 0 || cropHeight === 0) {
        return reject(new Error('Crop dimensions must be greater than zero.'));
    }

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return reject(new Error('Could not get canvas context.'));
    }

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const outputMimeType = ['image/png', 'image/jpeg', 'image/webp'].includes(originalMimeType) ? originalMimeType : 'image/png';
    const base64Image = canvas.toDataURL(outputMimeType);
    
    resolve({
      base64: base64Image.split(',')[1],
      mimeType: outputMimeType
    });
  });
}


export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageData, onImageClick, onClear, onExtract, isLoading }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const isCropActive = completedCrop && completedCrop.width > 0 && completedCrop.height > 0;

  const handleExtractSelection = async () => {
    if (completedCrop && imgRef.current) {
        try {
            const { base64, mimeType } = await getCroppedImg(imgRef.current, completedCrop, imageData.mimeType);
            onExtract(base64, mimeType);
        } catch(e) {
            console.error("Failed to crop image:", e);
        }
    }
  };

  const handleExtractFull = () => {
    onExtract(imageData.base64, imageData.mimeType);
  };
  
  const handlePrimaryAction = () => {
    if (isLoading) return;
    if (isCropActive) {
      handleExtractSelection();
    } else {
      handleExtractFull();
    }
  };

  const handleClearCrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCrop(undefined);
    setCompletedCrop(null);
  };

  return (
    <div className="relative w-full p-px rounded-xl bg-gradient-to-br from-light-border to-gray-200 dark:from-dark-border dark:to-gray-800 shadow-lg">
      <button
        onClick={onClear}
        className="absolute top-3 right-3 z-20 bg-black/50 text-white rounded-full p-2 transition-all duration-300 hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Clear and reset"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="bg-light-card dark:bg-dark-card p-4 rounded-xl flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-brand-gradient mb-4">Image Preview</h3>
        <div className="w-full h-auto flex items-center justify-center overflow-hidden rounded-md bg-light-bg dark:bg-dark-bg relative">
            <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={undefined} // Freeform crop
            >
                <img 
                    ref={imgRef}
                    src={imageData.url} 
                    alt="Pasted content" 
                    className="max-w-full max-h-full object-contain"
                    style={{ maxHeight: '75vh' }}
                />
            </ReactCrop>
            <button
                onClick={onImageClick}
                className="absolute bottom-2 right-2 z-10 bg-black/50 text-white rounded-full p-2 transition-all duration-300 hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Enlarge image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
            </button>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
                onClick={handlePrimaryAction}
                disabled={isLoading}
                className="w-full sm:w-auto font-bold py-3 px-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-card dark:focus:ring-offset-dark-card focus:ring-brand-primary rounded-full text-white bg-brand-gradient bg-200% hover:shadow-lg hover:shadow-brand-secondary/40 hover:scale-105 animate-gradient-shift disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
            >
                {isLoading 
                    ? 'Processing...' 
                    : (isCropActive ? 'Extract from Selection' : 'Extract Text')
                }
            </button>
            {isCropActive && !isLoading && (
              <button
                  onClick={handleClearCrop}
                  className="w-full sm:w-auto font-semibold py-3 px-6 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-card dark:focus:ring-offset-dark-card focus:ring-brand-primary rounded-full text-brand-primary dark:text-brand-secondary border-2 border-brand-primary dark:border-brand-secondary hover:bg-brand-primary/10 dark:hover:bg-brand-secondary/10"
                  aria-label="Clear crop selection"
              >
                  Clear Selection
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
