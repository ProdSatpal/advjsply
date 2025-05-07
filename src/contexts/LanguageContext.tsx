
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'mr';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, Translations>;
}

const translations: Record<Language, Translations> = {
  en: {
    // General translations
    advocate: 'Advocate',
    home: 'Home',
    services: 'Services',
    aboutMe: 'About Me',
    contact: 'Contact',
    bookAppointment: 'Book Appointment',
    allRightsReserved: 'All Rights Reserved',
    quickLinks: 'Quick Links',
    practiceAreas: 'Practice Areas',
    address: 'Address',

    // Hero section
    heroTitle: 'Justice Delivered With Excellence',
    heroSubtitle: 'Experienced Legal Service Provider in Nagpur',
    heroDescription: 'Advocate Jasvinder Singh Ply is a dedicated legal professional with over 12 years of experience, specializing in family law, civil matters, and property disputes.',
    learnMore: 'Learn More',
    
    // About texts
    about: 'About',
    Me: 'Me',
    professional: 'Professional',
    background: 'Background',
    experience: 'Experience',
    years: 'Years',
    education: 'Education',
    specialization: 'Specialization',
    scheduleConsultation: 'Schedule a Consultation',
    advJasvinderSinghPly: 'Adv. Jasvinder Singh Ply',
    
    // Services
    ourServices: 'Our Services',
    viewAllServices: 'View All Services',
    servicesIntro: 'Comprehensive legal services tailored to your needs',
    civilRights: 'Civil Rights',
    disabilityBenefits: 'Disability Benefits',
    criminalLaw: 'Criminal Law',
    propertyDisputes: 'Property Disputes',
    familyLaw: 'Family Law',
    civilRightsDesc: 'Protecting your fundamental rights through expert legal representation.',
    disabilityBenefitsDesc: 'Assisting with claims for disability benefits and accident compensation.',
    criminalLawDesc: 'Defending clients in criminal matters with strategic legal approaches.',
    propertyDisputesDesc: 'Resolving property conflicts through negotiation and litigation.',
    familyLawDesc: 'Guiding clients through divorce, custody, and other family matters.',
    
    // Why Choose section
    whyChooseUs: 'Why Choose Us',
    experienceTitle: 'Experienced',
    experienceDesc: 'Over 12 years of legal practice in various courts',
    dedicatedTitle: 'Dedicated',
    dedicatedDesc: 'Committed to providing personalized attention to each case',
    affordableTitle: 'Affordable',
    affordableDesc: 'Fair and transparent fee structure',

    // Contact page
    contactUs: 'Contact Us',
    contactIntro: 'Get in touch with Adv. Jasvinder Singh Ply for professional legal assistance',
    getInTouch: 'Get In Touch',
    callUs: 'Call Us',
    whatsappUs: 'WhatsApp Us',
    emailUs: 'Email Us',
    visitUs: 'Visit Us',
    officeHours: 'Office Hours',
    mondayToSaturday: 'Monday to Saturday: 10:00 AM - 7:00 PM',
    sunday: 'Sunday: By Appointment Only',
    connectWhatsapp: 'Connect on WhatsApp',
    ourLocation: 'Our Location',
    visitOffice: 'At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017',
    locationHelp: 'Need help finding our office? Feel free to contact us for directions.',
    whatsappInfo: 'Connect directly on WhatsApp for quick responses to your legal queries',
    whatsappContactDesc: 'Click the button below to connect with Adv. Jasvinder Singh Ply on WhatsApp for immediate assistance',
    connectOnWhatsapp: 'Connect on WhatsApp',
    appointmentInstruction: 'To schedule an appointment with Adv. Jasvinder Singh Ply, please click the button below',
    bookAppointmentNow: 'Book Appointment Now',
    scheduleAppointment: 'Schedule an Appointment',
  },
  
  hi: {
    // General translations
    advocate: 'अधिवक्ता',
    home: 'मुख्य पृष्ठ',
    services: 'सेवाएँ',
    aboutMe: 'मेरे बारे में',
    contact: 'संपर्क',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    quickLinks: 'त्वरित लिंक',
    practiceAreas: 'अभ्यास क्षेत्र',
    address: 'पता',

    // Hero section
    heroTitle: 'न्याय उत्कृष्टता के साथ',
    heroSubtitle: 'नागपुर में अनुभवी कानूनी सेवा प्रदाता',
    heroDescription: 'अधिवक्ता जसविंदर सिंह प्लाई 12 वर्षों से अधिक के अनुभव के साथ एक समर्पित कानूनी पेशेवर हैं, जो पारिवारिक कानून, नागरिक मामलों और संपत्ति विवादों में विशेषज्ञता रखते हैं।',
    learnMore: 'और जानें',
    
    // About texts
    about: 'मेरे बारे',
    Me: 'में',
    professional: 'पेशेवर',
    background: 'पृष्ठभूमि',
    experience: 'अनुभव',
    years: 'वर्ष',
    education: 'शिक्षा',
    specialization: 'विशेषज्ञता',
    scheduleConsultation: 'परामर्श शेड्यूल करें',
    advJasvinderSinghPly: 'अधिवक्ता जसविंदर सिंह प्लाई',
    
    // Services
    ourServices: 'हमारी सेवाएँ',
    viewAllServices: 'सभी सेवाएँ देखें',
    servicesIntro: 'आपकी जरूरतों के अनुसार व्यापक कानूनी सेवाएं',
    civilRights: 'नागरिक अधिकार',
    disabilityBenefits: 'विकलांगता लाभ',
    criminalLaw: 'आपराधिक कानून',
    propertyDisputes: 'संपत्ति विवाद',
    familyLaw: 'पारिवारिक कानून',
    civilRightsDesc: 'विशेषज्ञ कानूनी प्रतिनिधित्व के माध्यम से आपके मौलिक अधिकारों की रक्षा करना।',
    disabilityBenefitsDesc: 'विकलांगता लाभ और दुर्घटना मुआवजे के लिए दावों में सहायता।',
    criminalLawDesc: 'रणनीतिक कानूनी दृष्टिकोण के साथ आपराधिक मामलों में ग्राहकों का बचाव।',
    propertyDisputesDesc: 'बातचीत और मुकदमेबाजी के माध्यम से संपत्ति विवादों का समाधान।',
    familyLawDesc: 'तलाक, अभिरक्षा और अन्य पारिवारिक मामलों में ग्राहकों का मार्गदर्शन।',
    
    // Why Choose section
    whyChooseUs: 'हमें क्यों चुनें',
    experienceTitle: 'अनुभवी',
    experienceDesc: 'विभिन्न अदालतों में 12 वर्षों से अधिक का कानूनी अभ्यास',
    dedicatedTitle: 'समर्पित',
    dedicatedDesc: 'प्रत्येक मामले पर व्यक्तिगत ध्यान देने के लिए प्रतिबद्ध',
    affordableTitle: 'किफायती',
    affordableDesc: 'निष्पक्ष और पारदर्शी शुल्क संरचना',

    // Contact page
    contactUs: 'संपर्क करें',
    contactIntro: 'पेशेवर कानूनी सहायता के लिए अधिवक्ता जसविंदर सिंह प्लाई से संपर्क करें',
    getInTouch: 'संपर्क में रहें',
    callUs: 'हमें कॉल करें',
    whatsappUs: 'हमें व्हाट्सएप करें',
    emailUs: 'हमें ईमेल करें',
    visitUs: 'हमसे मिलें',
    officeHours: 'कार्यालय समय',
    mondayToSaturday: 'सोमवार से शनिवार: सुबह 10:00 बजे - शाम 7:00 बजे',
    sunday: 'रविवार: केवल अपॉइंटमेंट द्वारा',
    connectWhatsapp: 'व्हाट्सएप पर जुड़ें',
    ourLocation: 'हमारा स्थान',
    visitOffice: 'बुद्ध नगर, इंदोरा स्क्वायर, नागपुर, महाराष्ट्र 440017',
    locationHelp: 'हमारा कार्यालय ढूंढने में मदद चाहिए? दिशानिर्देशों के लिए हमसे संपर्क करें।',
    whatsappInfo: 'अपने कानूनी प्रश्नों के त्वरित उत्तरों के लिए सीधे व्हाट्सएप पर जुड़ें',
    whatsappContactDesc: 'तत्काल सहायता के लिए अधिवक्ता जसविंदर सिंह प्लाई से व्हाट्सएप पर जुड़ने के लिए नीचे दिए गए बटन पर क्लिक करें',
    connectOnWhatsapp: 'व्हाट्सएप पर जुड़ें',
    appointmentInstruction: 'अधिवक्ता जसविंदर सिंह प्लाई के साथ अपॉइंटमेंट निर्धारित करने के लिए, कृपया नीचे दिए गए बटन पर क्लिक करें',
    bookAppointmentNow: 'अभी अपॉइंटमेंट बुक करें',
    scheduleAppointment: 'अपॉइंटमेंट निर्धारित करें',
  },
  
  mr: {
    // General translations
    advocate: 'ॲडव्होकेट',
    home: 'मुख्यपृष्ठ',
    services: 'सेवा',
    aboutMe: 'माझ्याबद्दल',
    contact: 'संपर्क',
    bookAppointment: 'अपॉइंटमेंट बुक करा',
    allRightsReserved: 'सर्व हक्क राखीव',
    quickLinks: 'त्वरित लिंक्स',
    practiceAreas: 'अभ्यास क्षेत्र',
    address: 'पत्ता',

    // Hero section
    heroTitle: 'उत्कृष्टतेसह न्याय',
    heroSubtitle: 'नागपूर मध्ये अनुभवी कायदेशीर सेवा प्रदाता',
    heroDescription: 'ॲडव्होकेट जसविंदर सिंग प्लाई हे 12 वर्षांपेक्षा जास्त अनुभव असलेले समर्पित कायदेशीर व्यावसायिक आहेत, जे कौटुंबिक कायदा, नागरिक प्रकरणे आणि मालमत्ता वादांमध्ये विशेषज्ञता बाळगतात.',
    learnMore: 'अधिक जाणून घ्या',
    
    // About texts
    about: 'माझ्या',
    Me: 'बद्दल',
    professional: 'व्यावसायिक',
    background: 'पार्श्वभूमी',
    experience: 'अनुभव',
    years: 'वर्षे',
    education: 'शिक्षण',
    specialization: 'विशेषीकरण',
    scheduleConsultation: 'सल्ला शेड्यूल करा',
    advJasvinderSinghPly: 'ॲडव्होकेट जसविंदर सिंग प्लाई',
    
    // Services
    ourServices: 'आमच्या सेवा',
    viewAllServices: 'सर्व सेवा पहा',
    servicesIntro: 'तुमच्या गरजांनुसार सर्वसमावेशक कायदेशीर सेवा',
    civilRights: 'नागरी हक्क',
    disabilityBenefits: 'अपंगत्व लाभ',
    criminalLaw: 'फौजदारी कायदा',
    propertyDisputes: 'मालमत्ता वाद',
    familyLaw: 'कौटुंबिक कायदा',
    civilRightsDesc: 'तज्ञ कायदेशीर प्रतिनिधित्वाद्वारे तुमच्या मूलभूत हक्कांचे संरक्षण.',
    disabilityBenefitsDesc: 'अपंगत्व लाभ आणि अपघात भरपाईसाठी दाव्यांमध्ये सहाय्य.',
    criminalLawDesc: 'रणनीतिक कायदेशीर दृष्टिकोनासह फौजदारी प्रकरणांमध्ये क्लायंटचा बचाव.',
    propertyDisputesDesc: 'वाटाघाटी आणि कायदेशीर कारवाईद्वारे मालमत्ता वादांचे निराकरण.',
    familyLawDesc: 'घटस्फोट, पालकत्व आणि इतर कौटुंबिक प्रकरणांमध्ये क्लायंट्सना मार्गदर्शन.',
    
    // Why Choose section
    whyChooseUs: 'आम्हाला का निवडावे',
    experienceTitle: 'अनुभवी',
    experienceDesc: 'विविध न्यायालयांमध्ये 12 वर्षांपेक्षा जास्त कायदेशीर अभ्यास',
    dedicatedTitle: 'समर्पित',
    dedicatedDesc: 'प्रत्येक प्रकरणाकडे वैयक्तिक लक्ष देण्यास वचनबद्ध',
    affordableTitle: 'परवडणारे',
    affordableDesc: 'निष्पक्ष आणि पारदर्शक फी संरचना',

    // Contact page
    contactUs: 'संपर्क करा',
    contactIntro: 'व्यावसायिक कायदेशीर सहाय्यासाठी ॲडव्होकेट जसविंदर सिंग प्लाई यांच्याशी संपर्क साधा',
    getInTouch: 'संपर्क साधा',
    callUs: 'आम्हाला कॉल करा',
    whatsappUs: 'आम्हाला व्हाट्सअप करा',
    emailUs: 'आम्हाला ईमेल करा',
    visitUs: 'आमच्याकडे भेट द्या',
    officeHours: 'कार्यालयीन वेळ',
    mondayToSaturday: 'सोमवार ते शनिवार: सकाळी 10:00 - संध्याकाळी 7:00',
    sunday: 'रविवार: फक्त अपॉइंटमेंटद्वारे',
    connectWhatsapp: 'व्हाट्सअपवर कनेक्ट व्हा',
    ourLocation: 'आमचे स्थान',
    visitOffice: 'बुद्ध नगर, इंदोरा स्क्वेअर, नागपूर, महाराष्ट्र 440017',
    locationHelp: 'आमचे कार्यालय शोधण्यास मदत हवी? दिशानिर्देशांसाठी आमच्याशी संपर्क साधा.',
    whatsappInfo: 'आपल्या कायदेशीर प्रश्नांच्या त्वरित प्रतिसादासाठी थेट व्हाट्सअपवर कनेक्ट व्हा',
    whatsappContactDesc: 'ताबडतोब मदतीसाठी ॲडव्होकेट जसविंदर सिंग प्लाई यांच्याशी व्हाट्सअपवर जोडण्यासाठी खालील बटणावर क्लिक करा',
    connectOnWhatsapp: 'व्हाट्सअपवर कनेक्ट व्हा',
    appointmentInstruction: 'ॲडव्होकेट जसविंदर सिंग प्लाई यांच्यासह अपॉइंटमेंट शेड्यूल करण्यासाठी, कृपया खालील बटणावर क्लिक करा',
    bookAppointmentNow: 'आता अपॉइंटमेंट बुक करा',
    scheduleAppointment: 'अपॉइंटमेंट शेड्यूल करा',
  }
};


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
