
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServicesPreviewProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const ServicesPreview: React.FC<ServicesPreviewProps> = ({ addToRefs }) => {
  const { t } = useLanguage();

  const services = [
    {
      title: 'civilRights',
      description: 'civilRightsDesc'
    },
    {
      title: 'criminalLaw',
      description: 'criminalWritDesc'
    },
    {
      title: 'familyLaw',
      description: 'familyLawDesc'
    },
    {
      title: 'propertyDisputes',
      description: 'propertyDisputesDesc'
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            ref={addToRefs}
            className="text-3xl font-serif text-navy mb-4 animated-element"
          >
            {t('servicesPreview')}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p 
            ref={addToRefs}
            className="text-gray-700 max-w-2xl mx-auto animated-element"
          >
            {t('servicesPreviewDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              ref={addToRefs}
              className="animated-element transform transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            </div>
          ))}
        </div>

        <div 
          ref={addToRefs}
          className="mt-12 text-center animated-element"
        >
          <Button asChild className="bg-navy hover:bg-navy-light text-white font-medium">
            <Link to="/services">{t('viewAllServices')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
