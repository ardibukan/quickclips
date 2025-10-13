import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon } from '../components/Icons';
import VideoModal from '../components/VideoModal';

const tabs = ['Models', 'Hands-on', 'Performance', 'Safety', 'Build'];

const featureVideos = [
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Gemini 1.5 Pro: Long Context Reasoning',
    description: 'Watch Gemini 1.5 Pro analyze a 44-minute silent film, identifying plot points and key details in real-time.',
    thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&h=450&auto=format&fit=crop',
  },
  {
    video: 'https://www.youtube.com/watch?v=HK6y8DAPN_0',
    title: 'Sora: AI Text-to-Video Generation',
    description: 'See how OpenAI\'s Sora creates cinematic, high-fidelity video clips from simple text descriptions.',
    thumbnail: 'https://img.youtube.com/vi/HK6y8DAPN_0/maxresdefault.jpg',
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Devin: The First AI Software Engineer',
    description: 'Meet Devin, an autonomous AI agent capable of planning and executing complex software engineering tasks.',
    thumbnail: 'https://www.thedigitalspeaker.com/content/images/2023/02/Sustainable-AI-future.jpg',
  },
  {
    video: 'https://www.youtube.com/watch?v=Sq1QZB5baNw',
    title: 'Figure 01: AI-Powered Humanoid Robot',
    description: 'Figure\'s robot demonstrates fluid, human-like conversations and actions powered by OpenAI models.',
    thumbnail: 'https://img.youtube.com/vi/Sq1QZB5baNw/maxresdefault.jpg',
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'AlphaFold 3: Modeling Biological Systems',
    description: 'Discover how AlphaFold 3 predicts the structure and interactions of proteins, DNA, RNA, and ligands with unprecedented accuracy.',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&h=450&auto=format&fit=crop',
  },
  {
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Veo: Google\'s High-Definition Video Model',
    description: 'Explore Veo, Google\'s most capable video generation model, creating detailed and consistent long-form content.',
    thumbnail: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiDfT5V3JFhwqXP6TF6mewLgnkWnfVqVnwvH0Sjk39WI4n_nBASZhpuhD_lEHc0snnc0RaKTtqHOh6SHtWUekIEQvHLsn7h_tV7ZL0DLxnRhppAcbUW1Uu3JiJmgvtr8xC0Auq4p6avoExi8afQnRar4A0He_1BDuWF5LHhlr5nGKnzohzj8UrqNBTB6I/s1600-rw/Google%20AI%20Ultra.jpg',
  },
];

const ERROR_THUMBNAIL_URL = 'https://placehold.co/800x450/060606/FFFFFF/png?text=Image+Not+Found';

const FeaturesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Hands-on');
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const hasDragged = useRef(false);

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
                threshold: 0.6,
            }
        );
        
        const currentCardRefs = cardRefs.current;
        currentCardRefs.forEach(card => {
            if (card) observer.observe(card);
        });
        
        return () => {
            currentCardRefs.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        hasDragged.current = false;
        setIsDragging(true);

        const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
        setStartX(pageX - carousel.offsetLeft);
        setScrollLeft(carousel.scrollLeft);

        carousel.style.cursor = 'grabbing';
        carousel.style.scrollBehavior = 'auto';
    };

    const stopDragging = () => {
        const carousel = carouselRef.current;
        if (!carousel || !isDragging) return;
        
        setIsDragging(false);
        carousel.style.cursor = 'grab';
        carousel.style.scrollBehavior = 'smooth';
        
        if (hasDragged.current) {
            const currentScroll = carousel.scrollLeft;
            const carouselCenter = currentScroll + carousel.offsetWidth / 2;
            
            let closestIndex = 0;
            let minDistance = Infinity;

            cardRefs.current.forEach((card, index) => {
                if (card) {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    const distance = Math.abs(carouselCenter - cardCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });
            handleScrollTo(closestIndex);
        }
    };

    const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !carouselRef.current) return;
        
        e.preventDefault();
        hasDragged.current = true;
        
        const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
        const x = pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };
    
    const handleCardClick = (videoUrl: string) => {
        if (hasDragged.current) return;
        setActiveVideoUrl(videoUrl);
    };

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
                     <div 
                        ref={carouselRef} 
                        className="no-scrollbar flex overflow-x-auto py-8 w-full features-carousel"
                        style={{ cursor: 'grab' }}
                        onMouseDown={startDragging}
                        onMouseLeave={stopDragging}
                        onMouseUp={stopDragging}
                        onMouseMove={onDrag}
                        onTouchStart={startDragging}
                        onTouchEnd={stopDragging}
                        onTouchMove={onDrag}
                     >
                        <div className="flex space-x-6 md:space-x-12">
                            {featureVideos.map((feature, index) => (
                                <div
                                    key={index}
                                    ref={el => { cardRefs.current[index] = el; }}
                                    className={`w-[85vw] md:w-[480px] lg:w-[560px] flex-shrink-0 space-y-4 transition-all duration-500 ease-in-out ${
                                        activeSlideIndex === index ? 'opacity-100 transform scale-100' : 'opacity-60 transform scale-90'
                                    }`}
                                >
                                    <div 
                                        className="relative group aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 cursor-pointer"
                                        onClick={() => handleCardClick(feature.video)}
                                    >
                                        <img 
                                          src={feature.thumbnail} 
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
                        {featureVideos.map((_, index) => (
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