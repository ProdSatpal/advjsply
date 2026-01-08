
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Award, Briefcase, GraduationCap, Users, FileText, Check } from 'lucide-react';

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
            {t('about')} <p><span className="text-gold">{t('Me')}</span></p>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p 
            ref={addToRefs}
            className="text-gray-200 max-w-2xl mx-auto animated-element"
          >
            With over 12 years of legal expertise, Adv. Jasvinder Singh Ply provides personalized legal guidance and representation. Dedicated to navigating the complexities of family and real estate law with integrity and professionalism.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div 
                  ref={addToRefs}
                  className="animated-element"
                >
                  <div className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100">
                    <div className="aspect-[4/3] bg-gradient-to-br from-navy to-navy-light relative">
                      {/* Here you would insert an actual image of Adv. Singh */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-center px-4 text-lg font-serif">{t('advJasvinderSinghPly')}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-navy mb-2">{t('advocate')}</h3>
                      <div className="text-sm space-y-3 text-gray-600">
                        <p><strong>{t('experience')}:</strong> 12+ {t('years')}</p>
                        <p><strong>{t('education')}:</strong> B.Com, LL.B</p>
                        <p><strong>{t('specialization')}:</strong> Family Law, Real Estate</p>
                      </div>
                      
                      <div className="mt-6">
                        <Button asChild className="w-full bg-navy hover:bg-navy-light text-white">
                          <Link to="/contact" className="flex items-center justify-center gap-2">
                            {t('scheduleConsultation')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <div 
                ref={addToRefs}
                className="animated-element space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-serif text-navy mb-4">{t('professional')} <span className="text-gold">{t('background')}</span></h2>
                  <div className="w-20 h-1 bg-gold mb-6"></div>
                  <div className="prose max-w-none text-gray-700">
                    <p className="mb-4">
                    Advocate Jasvinder Singh Ply is a dedicated legal professional practicing in Nagpur. Since starting his independent practice in 2013, he has helped many clients with their legal issues, especially in family matters and real estate law.</p>
                    <p className="mb-4">
                    He is known for his clear legal advice, careful document handling, and strong mediation skills. Whether it’s resolving a family dispute or handling property paperwork, Advocate Jasvinder Singh ensures that each case is treated with honesty, care, and professionalism.</p>
                    <p className="mb-6">
                    His focus is always on achieving the best results for his clients and guiding them through every step of the legal process.</p>
                  </div>
                </div>
                
                {/* Qualifications Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                  
                  <Card className="border-l-4 border-emerald-500 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-emerald-600" />
                        {t('practiceAreas')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                        <li>Family Law</li>
                        <li>Real Estate Law</li>
                        <li>Civil Litigation</li>
                        <li>Property Documentation</li>
                        <li>Legal Consultation</li>
                        <li>Document Review</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-theme-red hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-theme-red" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Expert in Court Procedures</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Skilled Mediator</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Thorough Document Review</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Legal Documentation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Client Communication</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Civil Litigation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Drafting Affidavits</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>Systematic File Management</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>
        {`
        .animated-element {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animated-element.visible {
          opacity: 1;
          transform: translateY(0);
        }
        `}
      </style>
    </>
  );
};

export default About;
