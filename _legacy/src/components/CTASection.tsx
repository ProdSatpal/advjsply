
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CTASectionProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ addToRefs }) => {
  const { t } = useLanguage();
  const whatsappUrl = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

  return (
    <section 
      ref={addToRefs}
      className="py-16 bg-navy text-white animated-element"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif mb-4">{t('needLegal')}</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('needLegalDesc')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-medium">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t('bookAppointment')}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-black text-white border border-white hover:bg-white hover:text-black transition-colors">
            <Link to="/services">{t('learnMoreServices')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
