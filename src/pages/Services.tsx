
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
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

  const serviceCategories = [
    {
      title: 'civilLaw',
      services: [
        {
          title: 'civilRights',
          description: 'civilRightsDesc'
        },
        {
          title: 'disabilityBenefits',
          description: 'disabilityBenefitsDesc'
        },
        {
          title: 'evictionLitigation',
          description: 'evictionDesc'
        },
        {
          title: 'landlordTenant',
          description: 'landlordDesc'
        },
        {
          title: 'recoverySuit',
          description: 'recoveryDesc'
        }
      ]
    },
    {
      title: 'criminalLaw',
      services: [
        {
          title: 'criminalWrit',
          description: 'criminalWritDesc'
        },
        {
          title: 'regularBail',
          description: 'regularBailDesc'
        },
        {
          title: 'anticipatoryBail',
          description: 'anticipatoryDesc'
        },
        {
          title: 'chequeBouncing',
          description: 'chequeDesc'
        }
      ]
    },
    {
      title: 'familyLaw',
      services: [
        {
          title: 'domesticViolence',
          description: 'domesticDesc'
        },
        {
          title: 'mutualDivorce',
          description: 'mutualDesc'
        },
        {
          title: 'divorce',
          description: 'divorceDesc'
        },
        {
          title: 'registerMarriage',
          description: 'marriageDesc'
        }
      ]
    },
    {
      title: 'propertyDocumentation',
      services: [
        {
          title: 'willWriting',
          description: 'willDesc'
        },
        {
          title: 'partnershipDeed',
          description: 'partnershipDesc'
        },
        {
          title: 'legalNotice',
          description: 'noticeDesc'
        },
        {
          title: 'propertyRegistry',
          description: 'registryDesc'
        },
        {
          title: 'propertyDisputes',
          description: 'disputesDesc'
        },
        {
          title: 'agreements',
          description: 'agreementsDesc'
        }
      ]
    },
    {
      title: 'consumerProtection',
      services: [
        {
          title: 'consumerComplaint',
          description: 'consumerDesc'
        }
      ]
    }
  ];

  const whatsappUrl = "https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A";

  return (
    <>
      <Navbar />

      {/* Header */}
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

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section 
          key={category.title}
          className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
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
      ))}

      {/* Legal Process */}
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
            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-serif mb-2">{t('initialConsultation')}</h3>
              <p className="text-gray-300">{t('consultationDesc')}</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-serif mb-2">{t('caseAnalysis')}</h3>
              <p className="text-gray-300">{t('analysisDesc')}</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-serif mb-2">{t('legalRepresentation')}</h3>
              <p className="text-gray-300">{t('representationDesc')}</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-serif mb-2">{t('resolution')}</h3>
              <p className="text-gray-300">{t('resolutionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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

      <Footer />
    </>
  );
};

export default Services;
