
import React from 'react';
import WhyChooseUs from './WhyChooseUs';
import TestimonialsSection from './TestimonialsSection';

interface FeatureSectionProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ addToRefs }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <WhyChooseUs addToRefs={addToRefs} />
          <TestimonialsSection addToRefs={addToRefs} />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
