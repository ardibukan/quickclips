import React, { useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    videoRef.current?.play().catch(error => {
      console.error("Video autoplay failed:", error);
    });

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full rounded-lg"
          controls
          autoPlay
          onEnded={onClose}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/30 hover:bg-black/60 transition-colors"
        aria-label="Close video player"
      >
        <CloseIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoModal;
