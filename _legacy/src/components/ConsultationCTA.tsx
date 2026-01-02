
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConsultationCTAProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ addToRefs }) => {
  const { t } = useLanguage();
  const whatsappUrl = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

  return (
    <section 
      ref={addToRefs}
      className="py-16 bg-white animated-element"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-navy mb-4">{t('readyForSupport')}</h2>
          <p className="text-gray-700 mb-8">
            {t('scheduleConsultation')}
          </p>
          <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t('bookConsultation')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
