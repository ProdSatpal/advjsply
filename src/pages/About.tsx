
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Award, Briefcase, GraduationCap } from 'lucide-react';

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
                      <div className="text-sm space-y-2 text-gray-600">
                        <p><strong>{t('experience')}:</strong> 15+ {t('years')}</p>
                        <p><strong>{t('memberships')}:</strong> {t('membershipDescription')}</p>
                        <p className="border-t pt-2 mt-2 italic text-gray-500">"{t('philosophyQuote')}"</p>
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
                      {t('aboutDescription1')}
                    </p>
                    <p className="mb-4">
                      {t('aboutDescription2')}
                    </p>
                    <p className="mb-6">
                      {t('aboutDescription3')}
                    </p>
                  </div>
                </div>
                
                {/* Qualifications Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-theme-blue hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-theme-blue" />
                        {t('education')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-700">
                        <li>LL.B from Dr. Ambedkar College of Law, Nagpur University</li>
                        <li>B.A. in Political Science</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-gold hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-gold" />
                        {t('memberships')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{t('membershipDescription')}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-theme-red hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-theme-red" />
                        {t('professionalPhilosophy')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 italic">
                        "{t('philosophyQuote')}"
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-emerald-500 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-emerald-600" />
                        {t('practiceAreas')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                        <li>{t('civilRights')}</li>
                        <li>{t('criminalDefense')}</li>
                        <li>{t('familyLaw')}</li>
                        <li>{t('propertyLaw')}</li>
                        <li>{t('documentation')}</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-serif text-navy mb-4">{t('whyChooseMe')}</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span>{t('experiencedRepresentation')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span>{t('personalizedLegalSolutions')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span>{t('dedicatedAdvocacy')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span>{t('clientCentricApproach')}</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <Button asChild className="bg-navy hover:bg-navy-light text-white">
                      <Link to="/contact">{t('getInTouch')}</Link>
                    </Button>
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
