import React from 'react';

const SolutionsPage: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-400 !leading-snug">
          Solutions
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Tailored solutions for every industry and use case.
        </p>
      </div>
      <div className="mt-16 space-y-8 max-w-4xl mx-auto">
        <div className="bg-light-card/40 dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-2xl font-semibold mb-2">For Finance Teams</h3>
            <p className="text-gray-600 dark:text-gray-400">Automate invoice processing, expense reporting, and receipt digitization to streamline your financial workflows and reduce manual errors.</p>
        </div>
        <div className="bg-light-card/40 dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-2xl font-semibold mb-2">For Legal Professionals</h3>
            <p className="text-gray-600 dark:text-gray-400">Quickly digitize and search through legal documents, contracts, and case files with unparalleled accuracy, saving hours on discovery and review.</p>
        </div>
        <div className="bg-light-card/40 dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-2xl font-semibold mb-2">For Healthcare Providers</h3>
            <p className="text-gray-600 dark:text-gray-400">Convert patient records, lab results, and prescriptions into structured digital data securely and efficiently, ensuring HIPAA compliance.</p>
        </div>
         <div className="bg-light-card/40 dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-brand-blue/10">
            <h3 className="text-2xl font-semibold mb-2">For Logistics & Supply Chain</h3>
            <p className="text-gray-600 dark:text-gray-400">Automate the processing of bills of lading, shipping labels, and customs forms to accelerate your entire supply chain.</p>
        </div>
      </div>
    </main>
  );
};

export default SolutionsPage;
