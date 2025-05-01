
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-navy-light to-navy min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0xOGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDM2YzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div 
              ref={el => elementsRef.current[0] = el}
              className="animated-element delay-100"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t("justiceWithIntegrity")} <span className="text-gold">{t("integrity")}</span> <br />
                {t("and")} <span className="text-gold">{t("experience")}</span>
              </h1>
            </div>

            <div 
              ref={el => elementsRef.current[1] = el}
              className="animated-element delay-300"
            >
              <p className="text-lg text-gray-200 mt-4 md:text-xl max-w-xl">
                {t("heroDescription")}
              </p>
            </div>

            <div 
              ref={el => elementsRef.current[2] = el}
              className="animated-element delay-500 flex flex-wrap gap-4 pt-4"
            >
              <Button asChild size="lg" variant="gold" className="text-navy font-medium shadow-lg">
                <Link to="/contact">{t("bookConsultation")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg">
                <Link to="/services">{t("exploreServices")}</Link>
              </Button>
            </div>
          </div>

          <div 
            ref={el => elementsRef.current[3] = el}
            className="animated-element delay-700 hidden md:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-gold to-gold-light opacity-75 blur"></div>
              <div className="relative bg-navy p-6 rounded-lg shadow-xl">
                <h3 className="text-xl font-serif text-gold mb-4">{t("legalPracticeAreas")}</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span>{t("civilRightsLitigation")}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span>{t("disabilityBenefits")}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span>{t("propertyDisputes")}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span>{t("familyLaw")}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span>{t("criminalLaw")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
