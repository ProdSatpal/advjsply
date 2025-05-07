
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const animatedSectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedSectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      animatedSectionsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !animatedSectionsRef.current.includes(el)) {
      animatedSectionsRef.current.push(el);
    }
  };

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

  const whatsappUrl = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

  return (
    <>
      <Navbar />
      <Hero />

      {/* Services Preview */}
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            
            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <div className="bg-gray-50 rounded-lg p-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      <Footer />
    </>
  );
};

export default Index;
