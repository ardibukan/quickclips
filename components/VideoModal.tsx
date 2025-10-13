import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const getYouTubeEmbedUrl = (url: string): string | null => {
      try {
          const urlObj = new URL(url);
          const videoId = urlObj.searchParams.get('v');
          if (urlObj.hostname.includes('youtube.com') && videoId) {
              return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          }
          if (urlObj.hostname === 'youtu.be') {
            const videoIdFromPath = urlObj.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoIdFromPath}?autoplay=1&rel=0`;
          }
      } catch (error) {
        // Not a valid URL, which is fine, it might be a direct video link.
      }
      return null;
  };

  const isDirectVideo = (url: string): boolean => {
    try {
      const path = new URL(url).pathname;
      return /\.(mp4|webm|ogg)$/i.test(path);
    } catch (error) {
      return false;
    }
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const isDirect = isDirectVideo(videoUrl);

  useEffect(() => {
    if (!youtubeEmbedUrl && !isDirect) {
        console.error("Unsupported video URL:", videoUrl);
        onClose();
    }
  }, [videoUrl, youtubeEmbedUrl, isDirect, onClose]);

  if (!youtubeEmbedUrl && !isDirect) {
    return null;
  }

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
        {youtubeEmbedUrl ? (
             <iframe
                src={youtubeEmbedUrl}
                className="w-full h-full rounded-lg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        ) : (
            <video
                src={videoUrl}
                className="w-full h-full rounded-lg"
                controls
                autoPlay
                playsInline
            >
                Your browser does not support the video tag.
            </video>
        )}
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