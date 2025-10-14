import React from 'react';
import { ArrowRightIcon } from './Icons';
import { Page } from '../App';

interface HeroProps {
  navigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  return (
    <section       
      className="relative min-h-screen flex items-center bg-light-bg dark:bg-[url('https://lh3.googleusercontent.com/SpF9hIf_C3KSo-xElVbNF768qUJtb4TNoXTczjyxdH9BSUNnNaedlC7QYq6d9C8YGVnEfSjDdvC3hR4p81UijHFgLoqWqqRPQ70lpnJB50OAAot0iw=w1440')] bg-cover bg-center bg-no-repeat"
      >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-6">
          QuickClips
        </h1>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12">
          Our most intelligent AI models for image-to-text conversion and document automation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => navigate('extractor')}
            className="bg-brand-blue text-white font-semibold py-3 px-2 rounded-full flex items-center justify-center space-x-2 text-lg transition-colors w-64 border-2 border-transparent hover:border-white/80"
          >
            <span>Try for Free</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('resources')}
            className="bg-black text-white font-semibold py-3 px-2 rounded-full flex items-center justify-center space-x-2 text-lg transition-colors w-64 border-2 border-gray-700 hover:border-gray-400">
            <span>Build with QuickClips</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;