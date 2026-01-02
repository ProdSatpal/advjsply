
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const {
    t
  } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/', ariaLabel: 'Go to home page' },
    { name: t('services'), path: '/services', ariaLabel: 'View our legal services' },
    { name: t('aboutMe'), path: '/about', ariaLabel: 'Learn about Advocate Jasvinder Singh Ply' },
    { name: t('contact'), path: '/contact', ariaLabel: 'Contact Advocate Jasvinder Singh Ply' }
  ];

  const whatsappUrl = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Advocate Jasvinder Singh Ply - Go to home page">
            <img 
              src="/lovable-uploads/d70651df-f613-40b0-a4f6-beab02d1f3de.png" 
              alt="Advocate Logo" 
              className="h-10 w-10"
            />
            <div className="py-0">
              <span className="text-2xl font-serif font-bold text-theme-blue">Jasvinder Singh Ply</span>
              <div className="text-sm font-medium text-theme-red">{t('advocate')}</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-2">
              {navLinks.map(link => <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-theme-red
                      ${location.pathname === link.path ? 'text-theme-red font-semibold' : 'text-theme-blue'}`}
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </Link>
                </li>)}
            </ul>
            <div className="ml-2 mr-4">
              <LanguageSelector />
            </div>
            <Button asChild className="ml-4 bg-theme-blue hover:bg-theme-blue-dark text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Book an appointment via WhatsApp" className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                {t('bookAppointment')}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="border-theme-blue text-theme-blue" aria-label="Toggle mobile menu">
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="md:hidden mt-3 animate-fade-in">
            <ul className="bg-white rounded-lg shadow-lg py-2">
              {navLinks.map(link => <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`block px-4 py-2 text-base font-medium transition-colors hover:bg-muted
                      ${location.pathname === link.path ? 'text-theme-red font-semibold' : 'text-theme-blue'}`} 
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </Link>
                </li>)}
              <li className="mt-2 px-4 py-2">
                <Button asChild className="w-full bg-theme-blue hover:bg-theme-blue-dark">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="flex items-center justify-center"
                    aria-label="Book an appointment via WhatsApp"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    {t('bookAppointment')}
                  </a>
                </Button>
              </li>
            </ul>
          </div>}
      </div>
    </nav>;
};

export default Navbar;
