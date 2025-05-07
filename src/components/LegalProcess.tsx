
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalProcessProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const LegalProcess: React.FC<LegalProcessProps> = ({ addToRefs }) => {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: 'initialConsultation',
      description: 'consultationDesc'
    },
    {
      number: 2,
      title: 'caseAnalysis',
      description: 'analysisDesc'
    },
    {
      number: 3,
      title: 'legalRepresentation',
      description: 'representationDesc'
    },
    {
      number: 4,
      title: 'resolution',
      description: 'resolutionDesc'
    }
  ];

  return (
    <section className="py-16 bg-navy text-white">
      <div className="container mx-auto px-6">
        <div 
          ref={addToRefs}
          className="max-w-3xl mx-auto text-center mb-12 animated-element"
        >
          <h2 className="text-3xl font-serif mb-4">{t('ourLegalProcess')}</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300">
            {t('processTagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div 
              key={step.number}
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-serif mb-2">{t(step.title)}</h3>
              <p className="text-gray-300">{t(step.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalProcess;
