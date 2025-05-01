
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <Phone size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('callUs')}</h3>
            <a href="tel:+918857972717" className="text-theme-gray hover:text-theme-red transition-colors">+91 8857972717</a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-theme-red flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M9.5 13.5h5" />
          </svg>
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('whatsappUs')}</h3>
            <a 
              href="https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A" 
              className="text-theme-gray hover:text-theme-red transition-colors"
              target="_parent" 
              rel="noopener noreferrer"
            >
              +91 8857972717
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <Mail size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('emailUs')}</h3>
            <a href="mailto:adv.jsply@gmail.com" className="text-theme-gray hover:text-theme-red transition-colors break-all">adv.jsply@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <MapPin size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('visitUs')}</h3>
            <a href="https://maps.app.goo.gl/GUJWe32txpTwUexP8"><p className="text-theme-gray">At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017</p></a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <Clock size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('officeHours')}</h3>
            <p className="text-theme-gray">{t('mondayToSaturday')}</p>
            <p className="text-theme-gray">{t('sunday')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
