
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/ServicesHeader';
import ServiceCategory from '@/components/ServiceCategory';
import LegalProcess from '@/components/LegalProcess';
import ConsultationCTA from '@/components/ConsultationCTA';

const Services = () => {
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

  const serviceCategories = [
    {
      title: 'civilLaw',
      services: [
        {
          title: 'civilRights',
          description: 'civilRightsDesc'
        },
        {
          title: 'disabilityBenefits',
          description: 'disabilityBenefitsDesc'
        },
        {
          title: 'evictionLitigation',
          description: 'evictionDesc'
        },
        {
          title: 'landlordTenant',
          description: 'landlordDesc'
        },
        {
          title: 'recoverySuit',
          description: 'recoveryDesc'
        }
      ]
    },
    {
      title: 'criminalLaw',
      services: [
        {
          title: 'criminalWrit',
          description: 'criminalWritDesc'
        },
        {
          title: 'regularBail',
          description: 'regularBailDesc'
        },
        {
          title: 'anticipatoryBail',
          description: 'anticipatoryDesc'
        },
        {
          title: 'chequeBouncing',
          description: 'chequeDesc'
        }
      ]
    },
    {
      title: 'familyLaw',
      services: [
        {
          title: 'domesticViolence',
          description: 'domesticDesc'
        },
        {
          title: 'mutualDivorce',
          description: 'mutualDesc'
        },
        {
          title: 'divorce',
          description: 'divorceDesc'
        },
        {
          title: 'registerMarriage',
          description: 'marriageDesc'
        }
      ]
    },
    {
      title: 'propertyDocumentation',
      services: [
        {
          title: 'willWriting',
          description: 'willDesc'
        },
        {
          title: 'partnershipDeed',
          description: 'partnershipDesc'
        },
        {
          title: 'legalNotice',
          description: 'noticeDesc'
        },
        {
          title: 'propertyRegistry',
          description: 'registryDesc'
        },
        {
          title: 'propertyDisputes',
          description: 'disputesDesc'
        },
        {
          title: 'agreements',
          description: 'agreementsDesc'
        }
      ]
    },
    {
      title: 'consumerProtection',
      services: [
        {
          title: 'consumerComplaint',
          description: 'consumerDesc'
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <ServicesHeader />
      
      {serviceCategories.map((category, index) => (
        <ServiceCategory 
          key={category.title}
          category={category}
          index={index}
          addToRefs={addToRefs}
        />
      ))}

      <LegalProcess addToRefs={addToRefs} />
      <ConsultationCTA addToRefs={addToRefs} />
      <Footer />
    </>
  );
};

export default Services;
