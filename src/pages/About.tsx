
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
                      <div className="text-sm space-y-3 text-gray-600">
                        <p><strong>{t('experience')}:</strong> 12+ {t('years')}</p>
                        <p><strong>{t('education')}:</strong> B.Com, LL.B</p>
                        <p><strong>{t('specialization')}:</strong> Family Law, Real Estate</p>
                        <p className="border-t pt-3 mt-3 italic text-gray-500">"{t('philosophyQuote')}"</p>
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
                      Advocate Jasvinder Singh Ply has been a dedicated legal professional since 2004, embarking on his journey as a legal assistant before establishing his independent practice in 2013. With over 12 years of comprehensive experience in the legal field, he has built a reputation for excellence in family matters and real estate law across Punjab.
                    </p>
                    <p className="mb-4">
                      Beginning his career as a legal assistant at the office of S. J. Kamdi from 2004 to 2010, he specialized in family matters, developing a deep understanding of the complexities that families face during legal challenges. He later expanded his expertise by working with D. M. Bhujade from 2010 to 2013, focusing on real estate matters and property documentation.
                    </p>
                    <p className="mb-6">
                      Since establishing his independent practice in 2013, Adv. Singh has successfully represented numerous clients with his meticulous approach to legal procedures, skilled mediation techniques, and thorough document review processes. His commitment to justice and client satisfaction remains the cornerstone of his practice.
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
                        <li>Bachelor of Law (LL.B) - 2013</li>
                        <li>Bachelor of Commerce - 2004</li>
                        <li>Legal Training under S. J. Kamdi (2004-2010)</li>
                        <li>Advanced Real Estate Law Training with D. M. Bhujade (2010-2013)</li>
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
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>Bar Association of Punjab</li>
                        <li>Real Estate Legal Forum</li>
                        <li>Family Law Practitioners Association</li>
                      </ul>
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
                      <p className="mt-2 text-gray-700">
                        Adv. Singh believes in a client-centered approach, ensuring that each case is handled with the attention to detail and personalized service it deserves. His practice is built on the principles of integrity, thoroughness, and compassionate representation.
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
                        <li>Family Law</li>
                        <li>Real Estate Law</li>
                        <li>Civil Litigation</li>
                        <li>Property Documentation</li>
                        <li>Legal Consultation</li>
                        <li>Document Review</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Experience Section */}
                <Card className="border-none shadow-md bg-gray-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-navy" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-gold pl-4 py-1">
                      <p className="font-medium text-navy">Independent Legal Practice (2013 - Present)</p>
                      <p className="text-gray-700 text-sm">Established own practice focusing on family matters, real estate, and civil litigation</p>
                    </div>
                    <div className="border-l-2 border-gold pl-4 py-1">
                      <p className="font-medium text-navy">Legal Assistant at Office of D. M. Bhujade (2010 - 2013)</p>
                      <p className="text-gray-700 text-sm">Specialized in real estate law, property documentation, and related matters</p>
                    </div>
                    <div className="border-l-2 border-gold pl-4 py-1">
                      <p className="font-medium text-navy">Legal Assistant at Office of S. J. Kamdi (2004 - 2010)</p>
                      <p className="text-gray-700 text-sm">Focused on family law matters and gained extensive knowledge in domestic relations</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Highlights */}
                <Card className="border-none shadow-md bg-gray-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-navy" />
                      Professional Highlights
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
                        <span>Legal Documentation Specialist</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Strategic Client Communication</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Civil Litigation Expert</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Drafting Affidavits & Submissions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Systematic File Management</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Me Section */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-serif text-navy mb-4">Why Choose Adv. Singh</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span><strong>Experienced Representation:</strong> With over 12 years in the legal field, Adv. Singh brings depth of knowledge and practical experience to every case.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span><strong>Family Law Expertise:</strong> Specialized experience in handling sensitive family matters with discretion and compassion.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span><strong>Real Estate Documentation:</strong> Detailed knowledge of property laws and meticulous attention to documentation requirements.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-gold h-2 w-2 rounded-full mt-2 mr-2"></span>
                      <span><strong>Client-Centric Approach:</strong> Communication, transparency, and dedication to achieving the best possible outcome for each client.</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <Button asChild className="bg-navy hover:bg-navy-light text-white">
                      <Link to="/contact">Contact For Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .animated-element {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animated-element.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default About;
