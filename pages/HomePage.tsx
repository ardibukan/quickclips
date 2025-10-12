import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import FeatureSection from '../components/FeatureSection';
import VideoCarousel from '../components/VideoCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Page } from '../App';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <main>
      <Hero navigate={navigate} />
      <Carousel />
      <FeatureSection />
      <VideoCarousel />
      <TestimonialCarousel />
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 mb-6 !leading-snug">Start Automating Today</h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of users who are saving time and reducing errors with QuickClips.
        </p>
        <button 
          onClick={() => navigate('extractor')}
          className="bg-brand-blue text-white font-semibold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity"
        >
          Try QuickClips Free
        </button>
      </div>
    </main>
  );
};

export default HomePage;