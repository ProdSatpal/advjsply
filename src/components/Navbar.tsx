
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('services'), path: '/services' },
    { name: t('contact'), path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-theme-blue">Adv. <span className="text-theme-red">Jasvinder</span> Singh Ply</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-theme-red
                      ${location.pathname === link.path 
                        ? 'text-theme-red font-semibold' 
                        : 'text-theme-blue'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 mr-4">
              <LanguageSelector />
            </div>
            <Button asChild className="ml-4 bg-theme-blue hover:bg-theme-blue-dark text-white">
              <Link to="/contact">{t('bookAppointment')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border-theme-blue text-theme-blue"
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 animate-fade-in">
            <ul className="bg-white rounded-lg shadow-lg py-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={`block px-4 py-2 text-base font-medium transition-colors hover:bg-muted
                      ${location.pathname === link.path 
                        ? 'text-theme-red font-semibold' 
                        : 'text-theme-blue'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-4 py-2">
                <Button asChild className="w-full bg-theme-blue hover:bg-theme-blue-dark">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('bookAppointment')}</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
