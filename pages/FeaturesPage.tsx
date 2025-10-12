import React from 'react';

const FeaturesPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-green-400 !leading-snug">
          Features
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Discover the powerful features that make QuickClips the best solution for document automation.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Text Extraction</h3>
            <p className="text-gray-600 dark:text-gray-400">Accurately extract text from any image or PDF, including complex layouts and handwritten notes.</p>
        </div>
        <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">Smart Document Formatting</h3>
            <p className="text-gray-600 dark:text-gray-400">Automatically structure extracted data into clean, usable formats like JSON, CSV, or formatted text.</p>
        </div>
        <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
            <p className="text-gray-600 dark:text-gray-400">Our models support over 100 languages, making it a truly global solution.</p>
        </div>
         <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">Secure Cloud Storage</h3>
            <p className="text-gray-600 dark:text-gray-400">Your documents are encrypted and stored securely, accessible only by you.</p>
        </div>
         <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">Developer-Friendly API</h3>
            <p className="text-gray-600 dark:text-gray-400">Integrate QuickClips into your own applications with our robust and well-documented API.</p>
        </div>
         <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">Upload and process thousands of documents at once to save valuable time.</p>
        </div>
      </div>
    </main>
  );
};

export default FeaturesPage;
