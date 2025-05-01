
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const animatedElementsRef = useRef<HTMLElement[]>([]);

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

    animatedElementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      animatedElementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !animatedElementsRef.current.includes(el)) {
      animatedElementsRef.current.push(el);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-navy py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0xOGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDM2YzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 
            ref={addToRefs}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 animated-element"
          >
            {t('about')} <span className="text-gold">{t('advJasvinderSinghPly')}</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p 
            ref={addToRefs}
            className="text-gray-200 max-w-2xl mx-auto animated-element"
          >
            {t('aboutHeroDescription')}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <h2 className="text-3xl font-serif text-navy mb-4">{t('professional')} <span className="text-gold">{t('background')}</span></h2>
              <div className="w-20 h-1 bg-gold mb-6"></div>
              <p className="text-gray-700 mb-4">
                {t('aboutDescription1')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('aboutDescription2')}
              </p>
              <p className="text-gray-700 mb-6">
                {t('aboutDescription3')}
              </p>
              
              {/* Professional Information Cards */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-theme-blue-light hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-serif text-navy text-xl mb-2">{t('education')}</h3>
                    <p className="text-gray-700">LL.B from Dr. Ambedkar College of Law, Nagpur University</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-gold hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-serif text-navy text-xl mb-2">{t('memberships')}</h3>
                    <p className="text-gray-700">{t('membershipDescription')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-theme-red hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-serif text-navy text-xl mb-2">{t('professionalPhilosophy')}</h3>
                    <p className="text-gray-700">
                      "{t('philosophyQuote')}"
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500 hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-serif text-navy text-xl mb-2">{t('practiceAreas')}</h3>
                    <ul className="text-gray-700 grid grid-cols-2 gap-x-4 gap-y-2 list-disc pl-5">
                      <li>{t('civilRights')}</li>
                      <li>{t('criminalDefense')}</li>
                      <li>{t('familyLaw')}</li>
                      <li>{t('propertyLaw')}</li>
                      <li>{t('documentation')}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Button asChild className="bg-navy hover:bg-navy-light">
                <Link to="/contact">{t('scheduleConsultation')}</Link>
              </Button>
            </div>

            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-gold/50 to-gold-light/50 blur-lg opacity-70"></div>
                <div className="relative border-8 border-white shadow-xl rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
                  {/* Here you would insert an actual image of Adv. Singh */}
                  <div className="absolute inset-0 bg-navy/20 flex items-center justify-center">
                    <p className="text-white text-center px-4">{t('imageOf')} {t('advJasvinderSinghPly')}</p>
                  </div>
                </div>
                
                {/* Areas of Expertise with Improved Design */}
                <div className="mt-8 bg-gradient-to-br from-navy to-navy-light p-6 rounded-lg shadow-md text-white">
                  <h3 className="text-xl font-serif text-gold mb-5">{t('areasOfExpertise')}</h3>
                  
                  <div className="space-y-4">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-gold mr-2"></span>
                          <span className="text-sm font-medium text-white">{t('civilLitigation')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gold">95%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded-full bg-navy-dark bg-opacity-50">
                        <div style={{ width: "95%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-gold-light to-gold rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-theme-red mr-2"></span>
                          <span className="text-sm font-medium text-white">{t('criminalLaw')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gold">90%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded-full bg-navy-dark bg-opacity-50">
                        <div style={{ width: "90%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-theme-red-light to-theme-red rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-theme-blue mr-2"></span>
                          <span className="text-sm font-medium text-white">{t('familyLaw')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gold">85%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded-full bg-navy-dark bg-opacity-50">
                        <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-theme-blue-light to-theme-blue rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                          <span className="text-sm font-medium text-white">{t('propertyLaw')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gold">88%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded-full bg-navy-dark bg-opacity-50">
                        <div style={{ width: "88%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
