
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
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

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t("contactUs")}</h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              {t("contactIntro")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div 
              ref={addToRefs}
              className="animated-element lg:col-span-1"
            >
              <h2 className="text-2xl font-serif text-navy mb-6">{t("getInTouch")}</h2>
              <ContactInfo />
            </div>

            {/* Contact and Appointment Forms */}
            <div 
              ref={addToRefs}
              className="lg:col-span-2 animated-element"
            >
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="contact">{t("contactUs")}</TabsTrigger>
                  <TabsTrigger value="appointment">{t("bookAppointment")}</TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-serif text-navy mb-6">{t("connectWhatsapp")}</h2>
                    <ContactForm />
                  </div>
                </TabsContent>
                <TabsContent value="appointment">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-serif text-navy mb-6">{t("scheduleAppointment")}</h2>
                    <div className="text-center py-8">
                      <p className="mb-6 text-lg">{t("appointmentInstruction")}</p>
                      <Button 
                        asChild
                        className="bg-navy hover:bg-navy-light text-white py-3 px-8 text-lg"
                      >
                        <Link to="/contact">{t("bookAppointmentNow")}</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div 
            ref={addToRefs}
            className="max-w-3xl mx-auto text-center mb-12 animated-element"
          >
            <h2 className="text-3xl font-serif text-navy mb-4">{t("ourLocation")}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-700">
              {t("visitOffice")}
            </p>
          </div>

          <div 
            ref={addToRefs}
            className="animated-element"
          >
            <Map />
          </div>

          <div 
            ref={addToRefs}
            className="mt-8 text-center animated-element"
          >
            <p className="text-gray-700">
              {t("locationHelp")}
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section 
        ref={addToRefs}
        className="py-12 bg-navy text-white animated-element"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif mb-4">{t("connectWhatsapp")}</h2>
          <p className="text-gray-300 mb-6">
            {t("whatsappInfo")}
          </p>
          <a 
            href="https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A" 
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M9.5 13.5h5" />
            </svg>
            {t("connectOnWhatsapp")}
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
