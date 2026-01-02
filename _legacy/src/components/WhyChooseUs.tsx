
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhyChooseUsProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ addToRefs }) => {
  const { t } = useLanguage();
  
  return (
    <div 
      ref={addToRefs}
      className="animated-element"
    >
      <h2 className="text-3xl font-serif text-navy mb-4">{t('whyChooseUs')}</h2>
      <div className="w-20 h-1 bg-gold mb-6"></div>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">1</div>
          <div>
            <h3 className="font-serif text-xl text-navy mb-2">{t('expLegalExpertise')}</h3>
            <p className="text-gray-700">{t('expLegalDesc')}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">2</div>
          <div>
            <h3 className="font-serif text-xl text-navy mb-2">{t('personalizedApproach')}</h3>
            <p className="text-gray-700">{t('personalizedDesc')}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">3</div>
          <div>
            <h3 className="font-serif text-xl text-navy mb-2">{t('clearCommunication')}</h3>
            <p className="text-gray-700">{t('clearCommDesc')}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">4</div>
          <div>
            <h3 className="font-serif text-xl text-navy mb-2">{t('accessibility')}</h3>
            <p className="text-gray-700">{t('accessibilityDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
