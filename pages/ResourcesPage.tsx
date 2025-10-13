import React from 'react';
import { TemplateGenerator } from '../components/TemplateGenerator';

const ResourcesPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-cyan-400 !leading-snug">
          AI Document Generator
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Turn unstructured text from images into perfectly formatted documents. Upload an image, choose a template, and let AI do the rest.
        </p>
      </div>
       <div className="mt-12">
        <TemplateGenerator />
      </div>
    </main>
  );
};

export default ResourcesPage;