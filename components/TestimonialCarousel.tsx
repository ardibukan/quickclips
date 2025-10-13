
import React, { useState, useCallback, useEffect } from 'react';
import { CompanyLogo1, CompanyLogo2, CompanyLogo3, CompanyLogo4 } from './Icons';

const testimonialItems = [
  {
    logo: <CompanyLogo1 className="h-10 w-10 text-gray-400" />,
    quote: "QuickClips has revolutionized our document management process. The accuracy of the text extraction is unparalleled, saving us countless hours of manual data entry.",
    name: 'Sarah Johnson',
    title: 'Operations Manager, Innovate Inc.'
  },
  {
    logo: <CompanyLogo2 className="h-10 w-10 text-gray-400" />,
    quote: "The API was incredibly easy to integrate into our existing systems. We were up and running in a single afternoon. The developer experience is top-notch.",
    name: 'Michael Chen',
    title: 'Lead Developer, Tech Solutions'
  },
  {
    logo: <CompanyLogo3 className="h-10 w-10 text-gray-400" />,
    quote: "As a startup, efficiency is key. QuickClips allows our small team to process a high volume of invoices and receipts, letting us focus on growing our business.",
    name: 'Emily Rodriguez',
    title: 'Founder, NextGen Startups'
  },
  {
    logo: <CompanyLogo4 className="h-10 w-10 text-gray-400" />,
    quote: "The performance and scalability are impressive. We've thrown millions of documents at it without a single hiccup. It's an enterprise-ready solution.",
    name: 'David Lee',
    title: 'CTO, Global Enterprises'
  },
];


const TestimonialCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialItems.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
          nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Trusted by Teams Worldwide</h2>
                </div>
                <div className="max-w-3xl mx-auto overflow-hidden relative py-6">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {testimonialItems.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-4">
                                <div className="bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-lg dark:shadow-brand-blue/10 min-h-[320px] flex flex-col justify-center">
                                    <div className="flex justify-center mb-6">
                                        {item.logo}
                                    </div>
                                    <blockquote className="text-lg md:text-xl font-light text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                                        "{item.quote}"
                                    </blockquote>
                                    <footer className="mt-auto">
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                                    </footer>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-3 mt-8">
                    {testimonialItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`rounded-full transition-all duration-500 ease-in-out ${
                                activeIndex === index ? 'w-9 h-3 bg-transparent relative overflow-hidden border border-gray-500 dark:border-gray-400' : 'w-3 h-3 bg-transparent border border-gray-500 dark:border-gray-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        >
                            {activeIndex === index && (
                                <span
                                    key={activeIndex}
                                    className="absolute inset-px rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light animate-fill-pill"
                                ></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
