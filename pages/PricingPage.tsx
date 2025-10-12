import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-orange-400 !leading-snug">
          Pricing
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Simple, transparent pricing that scales with your needs.
        </p>
      </div>
       <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
         <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For individuals and small projects.</p>
            <ul className="space-y-2 mb-8 flex-grow text-gray-700 dark:text-gray-300">
                <li>✓ 100 extractions/month</li>
                <li>✓ Standard quality models</li>
                <li>✓ Community support</li>
            </ul>
            <button className="w-full bg-gray-200 dark:bg-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Get Started</button>
         </div>
         <div className="bg-light-card dark:bg-dark-card border-2 border-brand-blue rounded-2xl p-8 shadow-2xl flex flex-col relative">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-4">$49<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For professionals and growing businesses.</p>
            <ul className="space-y-2 mb-8 flex-grow text-gray-700 dark:text-gray-300">
                <li>✓ 5,000 extractions/month</li>
                <li>✓ High-accuracy models</li>
                <li>✓ Priority email support</li>
                <li>✓ API Access</li>
            </ul>
            <button className="w-full bg-brand-blue text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition-opacity">Choose Pro</button>
         </div>
         <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
            <p className="text-4xl font-bold mb-4">Custom</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For large organizations with custom needs.</p>
            <ul className="space-y-2 mb-8 flex-grow text-gray-700 dark:text-gray-300">
                <li>✓ Unlimited extractions</li>
                <li>✓ Highest-accuracy models</li>
                <li>✓ Dedicated support agent</li>
                <li>✓ Custom integrations & SSO</li>
            </ul>
            <button className="w-full bg-gray-200 dark:bg-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Contact Sales</button>
         </div>
       </div>
    </main>
  );
};

export default PricingPage;
