
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  addToRefs: (el: HTMLElement | null) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ addToRefs }) => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      text: t('testimonial1'),
      author: t('testimonial1Author')
    },
    {
      text: t('testimonial2'),
      author: t('testimonial2Author')
    },
    {
      text: "I was impressed by the detailed attention given to my case and the successful resolution. Highly recommend for any legal matters.",
      author: "Priya Sharma, Nagpur"
    },
    {
      text: "Professional, punctual and thorough in his approach. I'm grateful for the positive outcome of my case.",
      author: "Sunita Verma, Nagpur"
    }
  ];

  return (
    <div 
      ref={addToRefs}
      className="animated-element bg-gray-50 rounded-lg p-8"
    >
      <h3 className="text-2xl font-serif text-navy mb-4 text-center">{t('clientTestimonials')}</h3>
      
      <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <p className="text-gray-700 italic mb-4">{testimonial.text}</p>
                  <p className="font-medium text-navy">{testimonial.author}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static transform-none translate-y-0 left-0" />
          <CarouselNext className="relative static transform-none translate-y-0 right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialsSection;
