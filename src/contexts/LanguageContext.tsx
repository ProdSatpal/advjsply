
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Basic translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    'home': 'Home',
    'services': 'Services',
    'contact': 'Contact',
    'bookAppointment': 'Book Appointment',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'message': 'Message',
    'submit': 'Submit',
    'address': 'Address',
    'callUs': 'Call Us',
    'emailUs': 'Email Us',
    'visitUs': 'Visit Us',
    'officeHours': 'Office Hours',
    'mondayToSaturday': 'Monday - Saturday: 9:00 AM - 7:00 PM',
    'sunday': 'Sunday: Closed',
  },
  hi: {
    'home': 'होम',
    'services': 'सेवाएं',
    'contact': 'संपर्क',
    'bookAppointment': 'अपॉइंटमेंट बुक करें',
    'name': 'नाम',
    'email': 'ईमेल',
    'phone': 'फोन',
    'message': 'संदेश',
    'submit': 'सबमिट करें',
    'address': 'पता',
    'callUs': 'हमें कॉल करें',
    'emailUs': 'हमें ईमेल करें',
    'visitUs': 'हमसे मिलें',
    'officeHours': 'कार्यालय समय',
    'mondayToSaturday': 'सोमवार - शनिवार: सुबह 9:00 - शाम 7:00',
    'sunday': 'रविवार: बंद',
  },
  mr: {
    'home': 'मुख्यपृष्ठ',
    'services': 'सेवा',
    'contact': 'संपर्क',
    'bookAppointment': 'अपॉइंटमेंट बुक करा',
    'name': 'नाव',
    'email': 'ईमेल',
    'phone': 'फोन',
    'message': 'संदेश',
    'submit': 'सबमिट करा',
    'address': 'पत्ता',
    'callUs': 'आम्हाला कॉल करा',
    'emailUs': 'आम्हाला ईमेल करा',
    'visitUs': 'आम्हाला भेट द्या',
    'officeHours': 'कार्यालय वेळ',
    'mondayToSaturday': 'सोमवार - शनिवार: सकाळी 9:00 - संध्याकाळी 7:00',
    'sunday': 'रविवार: बंद',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
