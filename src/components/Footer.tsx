
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-gold" />
                <a href="tel:+918857972717" className="hover:text-gold transition-colors">+91 8857972717</a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-gold" />
                <a href="mailto:adv.jsply@gmail.com" className="hover:text-gold transition-colors">adv.jsply@gmail.com</a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gold" />
                <span>At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-gold" />
                <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-1 text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 13.5h5" />
                </svg>
                <a 
                  href="https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A" 
                  className="hover:text-gold transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  WhatsApp Me
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">About Me</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Book an Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-gold">Practice Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Civil Rights Litigation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Disability Benefits</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Criminal Law</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Property Disputes</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Family Law</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              &copy; {currentYear} Adv. Jasvinder Singh Ply. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
