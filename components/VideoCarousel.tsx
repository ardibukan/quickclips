
import React, { useState, useCallback, useEffect } from 'react';

const videoItems = [
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Seamless Data Integration',
    description: 'Connect with your favorite tools.'
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Advanced AI Processing',
    description: 'Leverage state-of-the-art models.'
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Automated Workflows',
    description: 'Save time with intelligent automation.'
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security you can trust.'
  },
];

const VideoCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % videoItems.length);
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
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">See QuickClips in Action</h2>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        See how QuickClips creates a simulation of intricate fractal patterns to explore a Mandelbrot set.
                    </p>
                </div>
                <div className="max-w-lg mx-auto overflow-hidden relative py-6">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {videoItems.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-2">
                                <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl p-4 shadow-lg dark:shadow-brand-blue/10">
                                    <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-900">
                                        <video
                                            key={item.video}
                                            src={item.video}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-3 mt-8">
                    {videoItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`rounded-full transition-all duration-500 ease-in-out ${
                                activeIndex === index ? 'w-9 h-3 bg-transparent relative overflow-hidden border border-gray-500 dark:border-gray-400' : 'w-3 h-3 bg-transparent border border-gray-500 dark:border-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {activeIndex === index && (
                                <span
                                    key={activeIndex}
                                    className="absolute inset-px rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light animate-fill-pill"
                                ></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VideoCarousel;
