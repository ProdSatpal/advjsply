
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';

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
      title: "Civil Law",
      services: [
        {
          title: "Civil Rights Litigation",
          description: "Representation in cases involving violations of civil rights and constitutional protections."
        },
        {
          title: "Disability Benefits Litigation",
          description: "Assistance with claims for disability benefits, including accident claims and compensation."
        },
        {
          title: "Eviction Litigation",
          description: "Legal representation for landlords or tenants in eviction proceedings."
        },
        {
          title: "Landlord and Tenant Litigation",
          description: "Resolution of disputes between landlords and tenants regarding leases, rent, and property conditions."
        },
        {
          title: "Recovery Suit",
          description: "Legal action to recover money or property owed through court proceedings."
        }
      ]
    },
    {
      title: "Criminal Law",
      services: [
        {
          title: "Criminal Writ Petition",
          description: "Filing of writ petitions challenging criminal proceedings or seeking relief in criminal matters."
        },
        {
          title: "Regular Bail",
          description: "Representation for obtaining bail for accused persons after arrest."
        },
        {
          title: "Anticipatory Bail",
          description: "Pre-arrest bail applications to prevent arrest in cases where charges are anticipated."
        },
        {
          title: "Negotiable Instrument (Cheque Bouncing)",
          description: "Legal representation in cases under Section 138 of the Negotiable Instruments Act."
        }
      ]
    },
    {
      title: "Family Law",
      services: [
        {
          title: "Domestic Violence Cases",
          description: "Legal support and protection for victims of domestic violence."
        },
        {
          title: "Mutual Divorce",
          description: "Assistance with uncontested divorce proceedings where both parties agree to separate."
        },
        {
          title: "Divorce",
          description: "Representation in contested divorce cases, handling all aspects of the dissolution of marriage."
        },
        {
          title: "Register Marriage",
          description: "Legal assistance with the registration of marriages under various personal laws."
        }
      ]
    },
    {
      title: "Property & Documentation",
      services: [
        {
          title: "Will Writing",
          description: "Drafting legally sound wills to ensure proper distribution of assets according to your wishes."
        },
        {
          title: "Partnership Deed Registration",
          description: "Preparation and registration of partnership deeds for business entities."
        },
        {
          title: "Legal Notice",
          description: "Drafting and sending formal legal notices on behalf of clients."
        },
        {
          title: "Property Registry (Transfer/Sale)",
          description: "Handling legal documentation for property transfers, sales, and registrations."
        },
        {
          title: "Property Disputes",
          description: "Resolution of disputes regarding ownership, boundaries, or inheritance of property."
        },
        {
          title: "Agreements (Sales/Services/MOU)",
          description: "Drafting and review of various legal agreements to protect your interests."
        }
      ]
    },
    {
      title: "Consumer Protection",
      services: [
        {
          title: "Consumer Complaint",
          description: "Representation in consumer disputes against products or services that failed to meet standards."
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Legal Services</h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              With over 12 years of experience, we offer comprehensive legal solutions 
              tailored to meet your specific needs. Browse our range of services below.
            </p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section 
          key={category.title}
          className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-6">
            <div 
              ref={addToRefs}
              className="mb-12 animated-element"
            >
              <h2 className="text-3xl font-serif text-navy mb-4">{category.title}</h2>
              <div className="w-20 h-1 bg-gold mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, serviceIndex) => (
                <div 
                  key={service.title}
                  ref={addToRefs}
                  className="animated-element"
                >
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    delay={serviceIndex * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Legal Process */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-6">
          <div 
            ref={addToRefs}
            className="max-w-3xl mx-auto text-center mb-12 animated-element"
          >
            <h2 className="text-3xl font-serif mb-4">Our Legal Process</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300">
              We follow a structured approach to ensure effective resolution of your legal matters. Here's how we work to address your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-serif mb-2">Initial Consultation</h3>
              <p className="text-gray-300">We discuss your case and understand your specific legal needs</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-serif mb-2">Case Analysis</h3>
              <p className="text-gray-300">We evaluate your situation and develop a strategic legal approach</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-serif mb-2">Legal Representation</h3>
              <p className="text-gray-300">We advocate on your behalf in negotiations or court proceedings</p>
            </div>

            <div 
              ref={addToRefs}
              className="text-center animated-element"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-serif mb-2">Resolution</h3>
              <p className="text-gray-300">We work diligently to achieve the best possible outcome for your case</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        ref={addToRefs}
        className="py-16 bg-white animated-element"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-navy mb-4">Ready to Get Legal Support?</h2>
            <p className="text-gray-700 mb-8">
              Schedule a consultation with Adv. Jasvinder Singh Ply to discuss your legal needs and explore how we can assist you.
            </p>
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
              <Link to="/contact">Book Your Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
