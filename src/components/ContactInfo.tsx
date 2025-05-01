
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
            <p className="text-theme-gray">+91 XXXXXXXXXX</p>
            <p className="text-theme-gray">+91 XXXXXXXXXX</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <Mail size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('emailUs')}</h3>
            <p className="text-theme-gray break-all">contact@jasvinderlegal.com</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <MapPin size={20} className="mr-3 text-theme-red flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-theme-blue">{t('visitUs')}</h3>
            <p className="text-theme-gray">At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017</p>
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
