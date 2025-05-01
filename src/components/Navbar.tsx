
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-navy">Adv. <span className="text-gold">Jasvinder</span> Singh Ply</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-gold
                      ${location.pathname === link.path 
                        ? 'text-gold font-semibold' 
                        : 'text-navy'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="ml-4 bg-navy hover:bg-navy-light">
              <Link to="/contact">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border-navy text-navy"
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
                        ? 'text-gold font-semibold' 
                        : 'text-navy'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-4 py-2">
                <Button asChild className="w-full bg-navy hover:bg-navy-light">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Book Appointment</Link>
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
