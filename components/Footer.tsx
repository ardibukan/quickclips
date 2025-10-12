import React from 'react';
import { 
    XIcon, InstagramIcon, YoutubeIcon, LinkedInIcon, GithubIcon,
    GeminiIcon, GemmaIcon, VeoIcon, ImagenIcon, LyriaIcon,
    AlphaFoldIcon, SynthIdIcon, WeatherNextIcon
} from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="mb-12">
            <h3 className="text-lg mb-6">Follow us</h3>
            <div className="flex space-x-6">
                <a href="#" aria-label="X" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><XIcon className="w-8 h-8" /></a>
                <a href="#" aria-label="Instagram" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><InstagramIcon className="w-8 h-8" /></a>
                <a href="#" aria-label="YouTube" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><YoutubeIcon className="w-8 h-8" /></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><LinkedInIcon className="w-8 h-8" /></a>
                <a href="#" aria-label="GitHub" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><GithubIcon className="w-8 h-8" /></a>
            </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Build AI responsibly to<br/>benefit humanity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-lg">
            <div>
                <h4 className="font-medium text-2xl mb-4">Models</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Build with our next generation AI systems</p>
                <ul className="space-y-5">
                    <FooterLink icon={<GeminiIcon className="w-7 h-7" />} text="Gemini" />
                    <FooterLink icon={<GemmaIcon className="w-7 h-7" />} text="Gemma" />
                    <FooterLink icon={<VeoIcon className="w-7 h-7" />} text="Veo" />
                    <FooterLink icon={<ImagenIcon className="w-7 h-7" />} text="Imagen" />
                    <FooterLink icon={<LyriaIcon className="w-7 h-7" />} text="Lyria" />
                </ul>
            </div>
             <div>
                <h4 className="font-medium text-2xl mb-4">Science</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Unlocking a new era of discovery with AI</p>
                <ul className="space-y-5">
                    <FooterLink icon={<AlphaFoldIcon className="w-7 h-7" />} text="AlphaFold" />
                    <FooterLink icon={<SynthIdIcon className="w-7 h-7" />} text="SynthID" />
                    <FooterLink icon={<WeatherNextIcon className="w-7 h-7" />} text="WeatherNext" />
                </ul>
            </div>
             <div>
                <h4 className="font-medium text-2xl mb-4">Learn more</h4>
                <ul className="space-y-5 mt-16">
                    <FooterLink text="About" />
                    <FooterLink text="News" />
                    <FooterLink text="Careers" />
                    <FooterLink text="Research" />
                </ul>
            </div>
        </div>

        <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xl">
            <p className="mb-4 md:mb-0">© 2025 QuickClips Inc.</p>
            <div className="flex flex-col sm:flex-row sm:space-x-8 text-center space-y-2 sm:space-y-0">
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
    icon?: React.ReactNode;
    text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, text }) => (
    <li>
        <a href="#" className="flex items-center space-x-4 group">
            {icon && <span className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{icon}</span>}
            <span className="text-xl group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">{text}</span>
        </a>
    </li>
);

export default Footer;