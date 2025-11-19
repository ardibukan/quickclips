import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MenuIcon, SearchIcon, ChevronDownIcon, SunIcon, MoonIcon, CloseIcon, SparkleIcon, ExternalLinkIcon, LogoIcon } from './Icons';
import { Page } from '../App';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
      onClose();
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[15vh] animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search site"
    >
      <div
        className="relative w-full max-w-xl bg-light-card dark:bg-dark-bg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="flex items-center p-2" role="search">
          <SearchIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 mx-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search website content..."
            className="w-full bg-transparent text-lg text-gray-800 dark:text-gray-200 focus:outline-none py-4"
            aria-label="Search website content"
          />
           <button
             type="submit"
             className="hidden sm:inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-full mx-2 hover:opacity-90 transition-opacity"
             aria-label="Submit search"
           >
             Search
           </button>
        </form>
         <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close search"
          >
            <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


interface MobileMenuProps {
  onClose: () => void;
  onSearchClick: () => void;
  navigate: (page: Page) => void;
}

const NavItem: React.FC<{ children: React.ReactNode; onClick: () => void; }> = ({ children, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between text-left group">
        <span className="text-2xl font-light group-hover:text-brand-blue-light transition-colors">{children}</span>
        <div className="p-3 rounded-full bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-800/80 dark:group-hover:bg-gray-700 transition-colors">
            <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </div>
    </button>
);

const ActionItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode; onClick?: () => void; }> = ({ icon, children, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between text-left group cursor-pointer">
    <span className="text-2xl font-light group-hover:text-brand-blue-light transition-colors">{children}</span>
    <div className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800/80 dark:hover:bg-gray-700 transition-colors">
      {icon}
    </div>
  </button>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, onSearchClick, navigate }) => {
  const handleNavigate = (page: Page) => {
    navigate(page);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-white z-50 p-4 flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-10 px-2">
        <button
          onClick={onClose}
          className="p-2 rounded-full 
            bg-gray-200 hover:bg-gray-300 
            dark:bg-gray-800/80 dark:hover:bg-gray-700 
            transition-colors"
        >
          <CloseIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <div onClick={() => handleNavigate('home')} className="flex items-center space-x-2 cursor-pointer">
          <span className="text-lg font-medium">QuickClips</span>
        </div>
        <button onClick={onSearchClick} className="p-3 rounded-full bg-gray-200 hover:bg-gray-300
             dark:bg-gray-800/80 dark:hover:bg-gray-700 transition-colors" aria-label="Search">
          <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <nav className="flex-grow flex flex-col space-y-6 px-2">
        <NavItem onClick={() => handleNavigate('features')}>Features</NavItem>
        <NavItem onClick={() => handleNavigate('solutions')}>Solutions</NavItem>
        <NavItem onClick={() => handleNavigate('pricing')}>Pricing</NavItem>
        <NavItem onClick={() => handleNavigate('resources')}>Resources</NavItem>
        <hr className="border-gray-800 my-4" />
        <ActionItem icon={<ExternalLinkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />}>Build with QuickClips</ActionItem>
        <ActionItem icon={<SparkleIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />} onClick={() => handleNavigate('extractor')}>Launch App</ActionItem>
      </nav>
    </div>
  );
};


interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  navigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  
  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 10) {
        setScrolled(true);
    } else {
        setScrolled(false);
    }
    
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShow(false);
    } else {
        setShow(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => {
        window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);
  
  const iconButtonClasses = `p-3 rounded-full text-gray-800 dark:text-gray-200 transition-colors ${
    scrolled ? 'bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700' : 'bg-gray-500/10 hover:bg-gray-500/20'
  }`;

  const handleOpenSearch = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${show ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-light-bg/70 dark:bg-dark-bg/70 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-8">
            <div className="flex items-center space-x-4">
               <button onClick={() => setIsMenuOpen(true)} className={`md:hidden ${iconButtonClasses}`} aria-label="Open menu">
                <MenuIcon className="w-6 h-6" />
              </button>
              <div onClick={() => navigate('home')} className="hidden md:flex items-center space-x-3 cursor-pointer">
                <LogoIcon className="w-8 h-8 text-brand-blue" />
                <span className="text-2xl font-bold tracking-tighter">QuickClips</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => navigate('features')} className="hover:text-brand-blue transition-colors flex items-center">
                <span>Features</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <button onClick={() => navigate('solutions')} className="hover:text-brand-blue transition-colors">Solutions</button>
              <button onClick={() => navigate('pricing')} className="hover:text-brand-blue transition-colors">Pricing</button>
              <button onClick={() => navigate('resources')} className="hover:text-brand-blue transition-colors">Resources</button>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={toggleTheme} className={iconButtonClasses} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
              {theme === 'light' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <button onClick={handleOpenSearch} className={iconButtonClasses} aria-label="Search">
              <SearchIcon className="w-6 h-6" />
            </button>
            <button onClick={() => navigate('extractor')} className="hidden md:block bg-brand-blue text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity">
              Launch App
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} onSearchClick={handleOpenSearch} navigate={navigate} />}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;