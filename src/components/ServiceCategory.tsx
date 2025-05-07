
import React, { useRef } from 'react';
import ServiceCard from './ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCategoryProps {
  category: {
    title: string;
    services: ServiceItem[];
  };
  index: number;
  addToRefs: (el: HTMLElement | null) => void;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ category, index, addToRefs }) => {
  const { t } = useLanguage();

  return (
    <section 
      className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-6">
        <div 
          ref={addToRefs}
          className="mb-12 animated-element"
        >
          <h2 className="text-3xl font-serif text-navy mb-4">{t(category.title)}</h2>
          <div className="w-20 h-1 bg-gold mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.services.map((service, serviceIndex) => (
            <div 
              key={service.title}
              ref={addToRefs}
              className="animated-element"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                delay={serviceIndex * 100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategory;
