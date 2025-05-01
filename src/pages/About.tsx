
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const About = () => {
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
            About <span className="text-gold">Adv. Jasvinder Singh Ply</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p 
            ref={addToRefs}
            className="text-gray-200 max-w-2xl mx-auto animated-element"
          >
            Dedicated legal professional with over 12 years of experience in various aspects of civil and criminal law.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              ref={addToRefs}
              className="animated-element"
            >
              <h2 className="text-3xl font-serif text-navy mb-4">Professional <span className="text-gold">Background</span></h2>
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
              <ScrollArea className="h-60 rounded border p-4 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-navy text-xl">Education</h3>
                    <p className="text-gray-700">LL.B from Dr. Ambedkar College of Law, Nagpur University</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-navy text-xl">Memberships</h3>
                    <p className="text-gray-700">Active member of the Nagpur Bar Association</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-navy text-xl">Professional Philosophy</h3>
                    <p className="text-gray-700">
                      "My goal is to provide clients with practical legal solutions while ensuring they fully understand their options and rights throughout the legal process. I believe in accessibility, transparency, and maintaining open lines of communication with every client."
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-navy text-xl">Practice Areas</h3>
                    <ul className="text-gray-700 list-disc pl-5">
                      <li>Civil Rights Litigation</li>
                      <li>Criminal Defense</li>
                      <li>Family Law</li>
                      <li>Property Law</li>
                      <li>Documentation and Legal Agreements</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
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
                <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-serif text-navy mb-3">Areas of Expertise</h3>
                  <div className="space-y-3">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-navy">Civil Litigation</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-navy">95%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                        <div style={{ width: "95%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"></div>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-navy">Criminal Law</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-navy">90%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                        <div style={{ width: "90%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"></div>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-navy">Family Law</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-navy">85%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                        <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"></div>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-navy">Property Law</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-navy">88%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                        <div style={{ width: "88%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"></div>
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
