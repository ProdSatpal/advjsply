
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
                <span>+91 XXXXXXXXXX</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-gold" />
                <span>contact@jasvinderlegal.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gold" />
                <span>At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-gold" />
                <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
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
              <span className="text-sm text-gray-300">
                12+ Years of Legal Excellence
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
