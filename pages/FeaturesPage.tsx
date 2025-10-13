import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon } from '../components/Icons';
import VideoModal from '../components/VideoModal';

const tabs = ['Models', 'Hands-on', 'Performance', 'Safety', 'Build'];

const featureVideos = [
  {
    thumbnail: 'https://i.imgur.com/v82M82L.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Plot interactive economic data',
    description: 'Watch Gemini 2.5 Pro use its reasoning capabilities to create an interactive bubble chart to visualize economic and health indicators over time.',
    prompt: 'Create an animated bubble chart using Plotly Express of how economic and health indicators have evolved over the years for each continent.'
  },
  {
    thumbnail: 'https://i.imgur.com/k2gS1nN.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Animate complex behavior',
    description: 'See how Gemini 2.5 Pro creates an interactive Javascript animation of colorful boids inside a spinning hexagon.',
    prompt: 'p5js (no HTML) swarm of 30 colorful boids swimming inside a rotating hexagon. I like supernova nebulae.'
  },
  {
    thumbnail: 'https://i.imgur.com/gYGkAmO.png',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Explore a Mandelbrot set',
    description: 'Generate a visualization of the Mandelbrot set, a classic example of a fractal in mathematics.',
    prompt: 'Explore a Mandelbrot set.'
  },
  {
    thumbnail: 'https://picsum.photos/seed/feature4/800/450',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Compose Sheet Music',
    description: 'From a high-level description, generate a full musical score with multiple instruments in MusicXML format.',
    prompt: 'Write a short, melancholic piano piece in C minor, with a simple melody and arpeggiated chords.'
  },
  {
    thumbnail: null, // Example of a missing thumbnail
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Draft Technical Documentation',
    description: 'Analyze a codebase and automatically generate clear, concise, and accurate technical documentation in Markdown.',
    prompt: 'Analyze this Python repository and generate a README.md file with an overview, installation guide, and API reference.'
  },
  {
    thumbnail: 'https://picsum.photos/seed/feature6/800/450',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Debug and Explain Code',
    description: 'Paste a code snippet with a bug, and get a step-by-step explanation of the issue and the corrected code.',
    prompt: 'Find the bug in this React component that causes an infinite re-render loop and explain why it happens.'
  },
];

const orderedFeatureVideos = [featureVideos[2], featureVideos[0], featureVideos[1], ...featureVideos.slice(3)];

const DEFAULT_THUMBNAIL_URL = 'https://placehold.co/800x450/060606/FFFFFF/png?text=QuickClips';
const ERROR_THUMBNAIL_URL = 'https://placehold.co/800x450/060606/FFFFFF/png?text=Image+Not+Found';


const FeaturesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Hands-on');
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScrollTo = useCallback((index: number) => {
        cardRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntries = entries.filter(e => e.isIntersecting);
                if (intersectingEntries.length === 0) return;
                
                const mostVisibleEntry = intersectingEntries.reduce((prev, current) => 
                    (prev.intersectionRatio > current.intersectionRatio) ? prev : current
                );
                
                const index = cardRefs.current.findIndex(ref => ref === mostVisibleEntry.target);
                if (index !== -1) {
                    setActiveSlideIndex(index);
                }
            },
            {
                root: carouselRef.current,
                threshold: Array.from(Array(101).keys()).map(i => i / 100),
            }
        );
        
        const currentCardRefs = cardRefs.current;
        currentCardRefs.forEach(card => {
            if (card) observer.observe(card);
        });

        if (carouselRef.current) {
            handleScrollTo(1);
        }
        
        return () => {
            currentCardRefs.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, [handleScrollTo]);


    return (
        <>
            {activeVideoUrl && <VideoModal videoUrl={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />}
            <main className="dark:bg-black dark:text-white min-h-screen pt-32 pb-20 overflow-x-hidden">
                <div className="text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-green-400 !leading-snug">
                        Hands-on with QuickClips
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        Discover the powerful features that make QuickClips the best solution for document automation.
                    </p>
                </div>

                <div className="flex justify-center items-center my-12">
                    <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 p-1.5 rounded-full">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${
                                    activeTab === tab 
                                        ? 'bg-brand-blue text-white' 
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div ref={carouselRef} className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory py-8 w-full features-carousel">
                        <div className="flex space-x-8">
                            {orderedFeatureVideos.map((feature, index) => (
                                <div
                                    key={index}
                                    ref={el => { cardRefs.current[index] = el; }}
                                    className={`snap-center w-[90vw] md:w-[480px] lg:w-[560px] flex-shrink-0 space-y-4 transition-all duration-500 ease-in-out ${
                                        activeSlideIndex === index ? 'opacity-100 transform scale-100' : 'opacity-60 transform scale-90'
                                    }`}
                                >
                                    <div 
                                        className="relative group aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 cursor-pointer"
                                        onClick={() => setActiveVideoUrl(feature.video)}
                                    >
                                        <img 
                                          src={feature.thumbnail || DEFAULT_THUMBNAIL_URL} 
                                          alt={feature.title} 
                                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                          onError={(e) => { e.currentTarget.src = ERROR_THUMBNAIL_URL; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-black/50 p-4 rounded-full">
                                                <PlayIcon className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4 right-4 group-hover:opacity-0 transition-opacity">
                                            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-white text-sm">
                                                <p className="font-bold mb-1">Prompt:</p>
                                                <p className="font-mono text-xs leading-snug">{feature.prompt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 text-center">
                                        <h3 className="text-2xl font-semibold text-text-heading-light dark:text-text-heading-dark">{feature.title}</h3>
                                        <p className="text-lg text-text-body-light dark:text-text-body-dark">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center space-x-3 mt-8">
                        {orderedFeatureVideos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleScrollTo(index)}
                                className={`rounded-full transition-all duration-300 ease-in-out ${
                                    activeSlideIndex === index
                                        ? 'w-8 h-2.5 bg-brand-blue'
                                        : 'w-2.5 h-2.5 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </>
    );
};

export default FeaturesPage;