
import React from 'react';

interface ClipboardPasteAreaProps {
  onUploadClick: () => void;
  isDragging: boolean;
}

export const ClipboardPasteArea: React.FC<ClipboardPasteAreaProps> = ({ onUploadClick, isDragging }) => {
  return (
    <div className="mt-8 flex justify-center items-center w-full">
        <div className={`w-full max-w-3xl p-1 rounded-2xl bg-gradient-to-br from-light-border to-gray-200 dark:from-dark-border dark:to-gray-800 transition-all duration-300 ${isDragging ? 'scale-105 bg-brand-gradient animate-gradient-shift bg-200%' : 'animate-pulse-border'}`}>
          <div className={`w-full h-full flex flex-col justify-center items-center bg-light-bg dark:bg-dark-bg/80 backdrop-blur-sm rounded-xl text-center p-8`}>
            {isDragging ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-text-muted-light dark:text-text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )}
            
            {isDragging ? (
                 <h2 className="mt-4 text-2xl font-semibold text-brand-primary">Drop Image to Upload</h2>
            ) : (
                <>
                    <h2 className="mt-4 text-2xl font-semibold text-text-heading-light dark:text-text-heading-dark">Paste or Upload an Image</h2>
                    <p className="mt-2 text-text-body-light dark:text-text-body-dark">Use <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> to paste, drag & drop, or click below.</p>
                    
                    <div className="flex items-center my-6 w-full max-w-xs">
                        <div className="flex-grow border-t border-light-border dark:border-dark-border"></div>
                        <span className="flex-shrink mx-4 text-text-muted-light dark:text-text-muted-dark font-semibold">OR</span>
                        <div className="flex-grow border-t border-light-border dark:border-dark-border"></div>
                    </div>

                    <button
                        onClick={onUploadClick}
                        type="button"
                        aria-label="Upload an image file"
                        className="font-bold py-3 px-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg focus:ring-brand-primary rounded-full text-white bg-brand-gradient bg-200% hover:shadow-lg hover:shadow-brand-secondary/40 hover:scale-105 animate-gradient-shift"
                    >
                        Upload an Image
                    </button>
                </>
            )}
        </div>
    </div>
    </div>
  );
};
