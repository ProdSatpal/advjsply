
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServicesPreview from '@/components/ServicesPreview';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';

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

  return (
    <>
      <Navbar />
      <Hero />
      <ServicesPreview addToRefs={addToRefs} />
      <FeatureSection addToRefs={addToRefs} />
      <CTASection addToRefs={addToRefs} />
      <Footer />
    </>
  );
};

export default Index;
