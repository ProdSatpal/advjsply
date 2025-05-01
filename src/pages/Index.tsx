
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';

const Index = () => {
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
      title: "Civil Rights Litigation",
      description: "Protection of your fundamental rights and civil liberties through strategic legal advocacy."
    },
    {
      title: "Criminal Law",
      description: "Comprehensive defense in criminal cases including bail petitions and writ petitions."
    },
    {
      title: "Family Law",
      description: "Guidance through divorce proceedings, domestic violence cases, and family disputes."
    },
    {
      title: "Property Law",
      description: "Assistance with property registry, disputes, and drafting of legal agreements."
    }
  ];

  return (
    <>
      <Navbar />
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <h2 className="text-3xl font-serif text-navy mb-4">About <span className="text-gold">Adv. Jasvinder Singh Ply</span></h2>
              <div className="w-20 h-1 bg-gold mb-6"></div>
              <p className="text-gray-700 mb-4">
                With over 12 years of experience in the legal field, Adv. Jasvinder Singh Ply has established himself as a respected legal practitioner in Nagpur, specializing in various aspects of civil, criminal, and family law.
              </p>
              <p className="text-gray-700 mb-4">
                His practice is built on the principles of integrity, dedication, and personalized attention to each client's unique legal needs. Adv. Singh is committed to providing accessible legal services while maintaining the highest standards of professional ethics.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're facing a complex legal challenge or simply need sound legal advice, Adv. Jasvinder Singh Ply brings his wealth of experience and deep understanding of the law to help you navigate the legal system effectively.
              </p>
              <Button asChild className="bg-navy hover:bg-navy-light">
                <Link to="/contact">Schedule a Consultation</Link>
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
                    <p className="text-white text-center px-4">Image of Adv. Jasvinder Singh Ply</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 
              ref={addToRefs}
              className="text-3xl font-serif text-navy mb-4 animated-element"
            >
              Our Legal Services
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p 
              ref={addToRefs}
              className="text-gray-700 max-w-2xl mx-auto animated-element"
            >
              We provide comprehensive legal services to meet your various needs. Our team is dedicated to offering personalized solutions tailored to your specific circumstances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                ref={addToRefs}
                className="animated-element"
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
            <Button asChild className="bg-navy hover:bg-navy-light">
              <Link to="/services">View All Services</Link>
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
              <h2 className="text-3xl font-serif text-navy mb-4">Why Choose Us</h2>
              <div className="w-20 h-1 bg-gold mb-6"></div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-serif text-xl text-navy mb-2">Experienced Legal Expertise</h3>
                    <p className="text-gray-700">With over 12 years in the field, we bring deep knowledge and proven strategies to every case.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-serif text-xl text-navy mb-2">Personalized Approach</h3>
                    <p className="text-gray-700">We recognize that each client's situation is unique and tailor our services accordingly.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-serif text-xl text-navy mb-2">Clear Communication</h3>
                    <p className="text-gray-700">We explain complex legal matters in straightforward terms so you can make informed decisions.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="font-serif text-xl text-navy mb-2">Accessibility</h3>
                    <p className="text-gray-700">We're responsive to your questions and concerns throughout the legal process.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-serif text-navy mb-4 text-center">Client Testimonials</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700 italic mb-4">"Adv. Jasvinder handled my property dispute case with utmost professionalism and expertise. His guidance throughout the process was invaluable."</p>
                    <p className="font-medium text-navy">- Rajesh Kumar, Nagpur</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700 italic mb-4">"I was impressed by the detailed attention given to my case and the successful resolution. Highly recommend for any legal matters."</p>
                    <p className="font-medium text-navy">- Priya Sharma, Nagpur</p>
                  </div>
                </div>
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
          <h2 className="text-3xl font-serif mb-4">Need Legal Assistance?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're facing a legal challenge or need advice on a specific matter, our team is ready to help you navigate the complexities of the legal system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-medium">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/services">Learn More About Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
