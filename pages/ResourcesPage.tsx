import React from 'react';
import { ExternalLinkIcon } from '../components/Icons';

const ResourcesPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-cyan-400 !leading-snug">
          Resources
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Explore our documentation, tutorials, and community forums.
        </p>
      </div>
       <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
         <a href="#" className="block bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:shadow-brand-blue/20 transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Dive into our comprehensive API docs and developer guides.</p>
            <span className="font-semibold text-brand-blue flex items-center">Read Docs <ExternalLinkIcon className="w-4 h-4 ml-1" /></span>
         </a>
         <a href="#" className="block bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:shadow-brand-blue/20 transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">Blog</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Stay updated with the latest news, product updates, and case studies.</p>
            <span className="font-semibold text-brand-blue flex items-center">Visit Blog <ExternalLinkIcon className="w-4 h-4 ml-1" /></span>
         </a>
         <a href="#" className="block bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:shadow-brand-blue/20 transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Connect with other developers, ask questions, and share your projects.</p>
            <span className="font-semibold text-brand-blue flex items-center">Join Discord <ExternalLinkIcon className="w-4 h-4 ml-1" /></span>
         </a>
         <a href="#" className="block bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:shadow-brand-blue/20 transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get help from our expert support team. We're here for you.</p>
            <span className="font-semibold text-brand-blue flex items-center">Contact Us <ExternalLinkIcon className="w-4 h-4 ml-1" /></span>
         </a>
       </div>
    </main>
  );
};

export default ResourcesPage;
