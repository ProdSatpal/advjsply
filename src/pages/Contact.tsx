
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import AppointmentForm from '@/components/AppointmentForm';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Contact = () => {
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              Get in touch with Adv. Jasvinder Singh Ply for expert legal assistance tailored to your needs.
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
              <h2 className="text-2xl font-serif text-navy mb-6">Get in Touch</h2>
              <ContactInfo />
            </div>

            {/* Contact and Appointment Forms */}
            <div 
              ref={addToRefs}
              className="lg:col-span-2 animated-element"
            >
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-serif text-navy mb-6">Send Us a Message</h2>
                    <ContactForm />
                  </div>
                </TabsContent>
                <TabsContent value="appointment">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-serif text-navy mb-6">Schedule an Appointment</h2>
                    <AppointmentForm />
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
            <h2 className="text-3xl font-serif text-navy mb-4">Our Location</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-700">
              Visit our office located at Buddh Nagar, Indora Square, Nagpur for in-person consultations.
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
              We're conveniently located near major landmarks in Nagpur. If you need help with directions, please don't hesitate to call us.
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
          <h2 className="text-2xl font-serif mb-4">Connect on WhatsApp</h2>
          <p className="text-gray-300 mb-6">
            For quick responses, reach out to us on WhatsApp. We're available during business hours to assist you.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M9.5 13.5h5" />
            </svg>
            Connect on WhatsApp
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
