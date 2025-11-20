import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ExtractorPage from './pages/ExtractorPage';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SolutionsPage from './pages/SolutionsPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import QrGeneratorPage from './pages/QrGeneratorPage';

export type Page = 'home' | 'extractor' | 'features' | 'solutions' | 'pricing' | 'resources' | 'qr-generator';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigate = (targetPage: Page) => {
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'extractor':
        return <ExtractorPage />;
      case 'features':
        return <FeaturesPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'pricing':
        return <PricingPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'qr-generator':
        return <QrGeneratorPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans min-h-screen transition-colors duration-300 overflow-x-hidden **bg-fixed**" 
     style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(74,128,255,0.1) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(74,128,255,0.1) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(100,80,255,0.1) 0%, transparent 40%)`
     }}><div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} toggleTheme={toggleTheme} navigate={navigate} />
        <div className="flex-grow">
          {renderPage()}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
