
import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLinkIcon, PlayIcon } from './Icons';

const carouselItems = [
  {
    image: `https://picsum.photos/seed/fractal1/800/450`,
    tag: 'MODELS',
    title: 'Gemini 2.5 Flash-Lite is now ready for scaled production use',
  },
  {
    image: `https://picsum.photos/seed/fractal2/800/450`,
    tag: 'MODELS',
    title: 'We’re expanding our Gemini 2.5 family of models',
  },
  {
    image: `https://picsum.photos/seed/fractal3/800/450`,
    tag: 'DEVELOPERS',
    title: 'Build faster and more cost-effectively with our new model',
  },
  {
    image: `https://picsum.photos/seed/fractal4/800/450`,
    tag: 'RESEARCH',
    title: 'Advancing the frontier of AI with long-context reasoning',
  },
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto overflow-hidden relative py-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg dark:shadow-brand-blue/10">
                  <div className="relative mb-4">
                    <img src={item.image} alt={item.title} className="rounded-2xl w-full aspect-video object-cover"/>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                        <div className="bg-black/50 p-3 rounded-full">
                            <PlayIcon className="w-8 h-8 text-white"/>
                        </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 mb-2">{item.tag}</p>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white pr-4">{item.title}</h3>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
                      <ExternalLinkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center space-x-3 mt-8">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? 'w-9 h-3 bg-gray-200 dark:bg-gray-700 relative overflow-hidden border border-gray-500 dark:border-gray-400'
                  : 'w-3 h-3 bg-transparent border border-gray-500 dark:border-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {activeIndex === index && (
                <span
                  key={activeIndex}
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light animate-fill-pill"
                ></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;