
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-16 bg-navy">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t('ourLegalServices')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">
            {t('experienceTagline')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHeader;
