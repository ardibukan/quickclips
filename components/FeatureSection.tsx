
import React, { useState } from 'react';
import { PlayIcon } from './Icons';

const tabs = ['Hands-on', 'Models', 'Performance'];
const content = {
    'Hands-on': {
        image1: `https://picsum.photos/seed/mandelbrot1/800/450`,
        image2: `https://picsum.photos/seed/mandelbrot2/800/450`,
        title: 'Code a fractal visualization',
        description: 'See how QuickClips creates a simulation of intricate fractal patterns to explore a Mandelbrot set.',
    },
    'Models': {
        image1: `https://picsum.photos/seed/models1/800/450`,
        image2: `https://picsum.photos/seed/models2/800/450`,
        title: 'Extract complex table data',
        description: 'Watch QuickClips accurately parse and digitize complex tables from scanned documents and invoices.',
    },
    'Performance': {
        image1: `https://picsum.photos/seed/perf1/800/450`,
        image2: `https://picsum.photos/seed/perf2/800/450`,
        title: 'Real-time document generation',
        description: 'Experience the speed of QuickClips as it generates formatted documents from raw text and images in seconds.',
    },
};

const FeatureSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Hands-on' | 'Models' | 'Performance'>('Hands-on');

    return (
        <section className="py-20 px-6">
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-4xl mx-auto mb-6">
                    QuickClips models are capable of reasoning through their thoughts before responding
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
                    This results in enhanced performance and improved accuracy for all your automation tasks.
                </p>
            </div>
            <div className="flex justify-center items-center space-x-2 my-12">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                            activeTab === tab 
                                ? 'bg-brand-blue text-white' 
                                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="container mx-auto max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="relative group overflow-hidden rounded-2xl">
                             <img src={content[activeTab].image1} alt={content[activeTab].title} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/50 p-3 rounded-full"><PlayIcon className="w-8 h-8 text-white"/></div>
                             </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl">
                             <img src={content[activeTab].image2} alt={content[activeTab].title} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/50 p-3 rounded-full"><PlayIcon className="w-8 h-8 text-white"/></div>
                             </div>
                        </div>
                    </div>
                    <div className="text-center md:text-left md:pl-10">
                         <h3 className="text-3xl font-medium mb-4">{content[activeTab].title}</h3>
                         <p className="text-lg text-gray-600 dark:text-gray-400">{content[activeTab].description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
