
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MenuIcon, SearchIcon, ChevronDownIcon, SunIcon, MoonIcon, CloseIcon, SparkleIcon, ExternalLinkIcon, LogoIcon, ClipboardIcon, InvoiceIcon, QrCodeIcon } from './Icons';
import { Page } from '../App';
import { Paperclip } from 'lucide-react';

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

interface MobileNavItemProps {
    label: string;
    children?: React.ReactNode;
    onClick?: () => void; // For direct links without submenu
    isOpen?: boolean;
    onToggle?: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ label, children, onClick, isOpen, onToggle }) => {
    const hasSubmenu = !!children;
    
    return (
        <div className="w-full">
            <button 
                onClick={hasSubmenu ? onToggle : onClick} 
                className="w-full flex items-center justify-between text-left group py-2"
            >
                <span className={`text-2xl font-light transition-colors ${isOpen ? 'text-brand-blue' : 'text-gray-800 dark:text-gray-100 group-hover:text-brand-blue-light'}`}>
                    {label}
                </span>
                {hasSubmenu && (
                    <div className={`p-3 rounded-full transition-all duration-300 ${isOpen ? 'bg-brand-blue/10 rotate-180' : 'bg-gray-100 dark:bg-gray-800/80 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'}`}>
                        <ChevronDownIcon className={`w-5 h-5 transition-colors ${isOpen ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                )}
            </button>
            {hasSubmenu && (
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                     <div className="pl-4 space-y-3 py-2 border-l-2 border-gray-200 dark:border-gray-800 ml-1">
                        {children}
                     </div>
                </div>
            )}
        </div>
    );
};

const MobileSubItem: React.FC<{ onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }> = ({ onClick, children, icon }) => (
    <button onClick={onClick} className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-colors w-full text-left py-1">
        {icon && <span className="opacity-70">{icon}</span>}
        <span>{children}</span>
    </button>
);

const ActionItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode; onClick?: () => void; }> = ({ icon, children, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between text-left group cursor-pointer py-2">
    <span className="text-xl font-light text-gray-800 dark:text-gray-100 group-hover:text-brand-blue-light transition-colors">{children}</span>
    <div className="bg-gray-100 dark:bg-gray-800/80 p-3 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
      {icon}
    </div>
  </button>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, onSearchClick, navigate }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNavigate = (page: Page) => {
    navigate(page);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white z-50 p-6 flex flex-col animate-fade-in overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" aria-label="Close menu">
          <CloseIcon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
        </button>
        <div onClick={() => handleNavigate('home')} className="flex items-center space-x-2 cursor-pointer md:hidden">
             <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">QuickClips</span>
        </div>
        <button onClick={onSearchClick} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" aria-label="Search">
          <SearchIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
      </div>
      
      <nav className="flex-grow flex flex-col space-y-2">
        <MobileNavItem label="Home" onClick={() => handleNavigate('home')} />
        <MobileNavItem 
            label="Features" 
            isOpen={expandedSection === 'features'} 
            onToggle={() => toggle('features')}
        >
             <MobileSubItem onClick={() => handleNavigate('extractor')} icon={<ClipboardIcon className="w-5 h-5"/>}>Image Extractor</MobileSubItem>
             <MobileSubItem onClick={() => handleNavigate('resources')} icon={<InvoiceIcon className="w-5 h-5"/>}>Doc Generator</MobileSubItem>
             <MobileSubItem onClick={() => handleNavigate('qr-generator')} icon={<QrCodeIcon className="w-5 h-5"/>}>QR Code Generator</MobileSubItem>
             <MobileSubItem onClick={() => handleNavigate('features')}>View All Features</MobileSubItem>
        </MobileNavItem>

        <MobileNavItem 
            label="Solutions" 
            isOpen={expandedSection === 'solutions'} 
            onToggle={() => toggle('solutions')}
        >
             {['Finance', 'Legal', 'Healthcare', 'Logistics'].map(item => (
                 <MobileSubItem key={item} onClick={() => handleNavigate('solutions')}>
                    {item} Teams
                 </MobileSubItem>
             ))}
        </MobileNavItem>
        
        <MobileNavItem label="Pricing" onClick={() => handleNavigate('pricing')} />
        <MobileNavItem label="Resources" onClick={() => handleNavigate('resources')} />

        <hr className="border-gray-200 dark:border-gray-800 my-6" />
        <ActionItem icon={<ExternalLinkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />}>Build with QuickClips</ActionItem>
        <ActionItem icon={<SparkleIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />} onClick={() => handleNavigate('extractor')}>Launch App</ActionItem>
      </nav>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
          <button 
              onClick={onClose} 
              className="flex items-center mx-auto justify-center py-2 px-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
          >
              <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                  <CloseIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </div>
              <div className="mr-3"> Close </div>
          </button>
      </div>
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
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
              {/* Logo and Text hidden on mobile (md:flex) */}
              <div onClick={() => navigate('home')} className="hidden md:flex items-center space-x-3 cursor-pointer">
                <LogoIcon className="w-8 h-8" />
                <span className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">QuickClips</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800 dark:text-gray-200">
              {/* Features Dropdown */}
              <div 
                className="relative group py-4"
                onMouseEnter={() => setHoveredNav('features')}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button 
                  onClick={() => navigate('features')} 
                  className={`hover:text-brand-blue transition-colors flex items-center ${hoveredNav === 'features' ? 'text-brand-blue' : ''}`}
                >
                  <span>Features</span>
                  <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${hoveredNav === 'features' ? 'rotate-180' : ''}`} />
                </button>
                
                {hoveredNav === 'features' && (
                    <div className="absolute top-full -left-4 pt-2 w-72 animate-fade-in">
                         <div className="bg-light-card dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-2 overflow-hidden">
                            <button onClick={() => { navigate('extractor'); setHoveredNav(null); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 group/item">
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/50 transition-colors">
                                    <ClipboardIcon className="w-5 h-5 text-brand-blue" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-sm">Image Extractor</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Convert images to editable text</div>
                                </div>
                            </button>
                            <button onClick={() => { navigate('resources'); setHoveredNav(null); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 group/item">
                                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg group-hover/item:bg-purple-100 dark:group-hover/item:bg-purple-900/50 transition-colors">
                                    <InvoiceIcon className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-sm">Doc Generator</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Automate PDF creation</div>
                                </div>
                            </button>
                            <button onClick={() => { navigate('qr-generator'); setHoveredNav(null); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 group/item">
                                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg group-hover/item:bg-green-100 dark:group-hover/item:bg-green-900/50 transition-colors">
                                    <QrCodeIcon className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-sm">QR Code Generator</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Create QR codes for links</div>
                                </div>
                            </button>
                            <hr className="border-gray-200 dark:border-gray-800 my-1 mx-2" />
                             <button onClick={() => { navigate('features'); setHoveredNav(null); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3">
                                <div className="font-medium text-brand-blue text-sm pl-2">View all features &rarr;</div>
                            </button>
                        </div>
                    </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative group py-4"
                onMouseEnter={() => setHoveredNav('solutions')}
                onMouseLeave={() => setHoveredNav(null)}
              >
                 <button 
                    onClick={() => navigate('solutions')} 
                    className={`hover:text-brand-blue transition-colors flex items-center ${hoveredNav === 'solutions' ? 'text-brand-blue' : ''}`}
                 >
                    <span>Solutions</span>
                    <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${hoveredNav === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                {hoveredNav === 'solutions' && (
                    <div className="absolute top-full -left-4 pt-2 w-64 animate-fade-in">
                         <div className="bg-light-card dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-2 overflow-hidden">
                            {['Finance', 'Legal', 'Healthcare', 'Logistics'].map((item) => (
                                <button 
                                    key={item}
                                    onClick={() => { navigate('solutions'); setHoveredNav(null); }} 
                                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item} Teams</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
              </div>

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
