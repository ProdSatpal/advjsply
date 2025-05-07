
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'mr';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, Translations>;
}

// Group translations by feature/page
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
    
    // About page
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
    
    // Services home page
    ourServices: 'Our Services',
    viewAllServices: 'View All Services',
    servicesIntro: 'Comprehensive legal services tailored to your needs',
    
    // Services page - Overview
    ourLegalServices: 'Our Legal Services',
    experienceTagline: 'Comprehensive legal support for individuals and businesses, backed by over a decade of expertise.',

    // Services page - Process section
    ourLegalProcess: 'Our Legal Process',
    processTagline: 'Our systematic approach ensures thorough handling of your legal matters from start to finish.',
    initialConsultation: 'Initial Consultation',
    consultationDesc: 'We discuss your situation and legal needs in detail.',
    caseAnalysis: 'Case Analysis',
    analysisDesc: 'Our experts evaluate your case and develop a strategic approach.',
    legalRepresentation: 'Legal Representation',
    representationDesc: 'We represent your interests in negotiations and court proceedings.',
    resolution: 'Resolution',
    resolutionDesc: 'We work toward a favorable outcome for your legal matter.',
    readyForSupport: 'Ready for Legal Support?',
    bookConsultation: 'Book a Consultation',
    
    // Services page - Category titles
    civilLaw: 'Civil Law',
    criminalLaw: 'Criminal Law',
    familyLaw: 'Family Law',
    propertyDocumentation: 'Property Documentation',
    consumerProtection: 'Consumer Protection',
    
    // Services page - Service titles
    civilRights: 'Civil Rights',
    disabilityBenefits: 'Disability Benefits',
    evictionLitigation: 'Eviction Litigation',
    landlordTenant: 'Landlord Tenant Disputes',
    recoverySuit: 'Recovery Suit',
    criminalWrit: 'Criminal Writ',
    regularBail: 'Regular Bail',
    anticipatoryBail: 'Anticipatory Bail',
    chequeBouncing: 'Cheque Bouncing',
    domesticViolence: 'Domestic Violence',
    mutualDivorce: 'Mutual Divorce',
    divorce: 'Divorce',
    registerMarriage: 'Register Marriage',
    willWriting: 'Will Writing',
    partnershipDeed: 'Partnership Deed',
    legalNotice: 'Legal Notice',
    propertyRegistry: 'Property Registry',
    propertyDisputes: 'Property Disputes',
    agreements: 'Agreements',
    consumerComplaint: 'Consumer Complaint',
    
    // Services page - Service descriptions
    civilRightsDesc: 'Protecting your fundamental rights through expert legal representation.',
    disabilityBenefitsDesc: 'Assisting with claims for disability benefits and accident compensation.',
    evictionDesc: 'Expert legal representation for tenants facing eviction or landlords seeking to evict.',
    landlordDesc: 'Resolving disputes between landlords and tenants, including lease violations and property damage.',
    recoveryDesc: 'Legal assistance for recovery of debts, money, and property through effective litigation.',
    criminalLawDesc: 'Defending clients in criminal matters with strategic legal approaches.',
    criminalWritDesc: 'Filing and defending criminal writs to protect fundamental rights in criminal proceedings.',
    regularBailDesc: 'Legal representation for obtaining bail after arrest in criminal cases.',
    anticipatoryDesc: 'Pre-arrest bail application to prevent arrest in non-bailable offenses.',
    chequeDesc: 'Legal assistance for cases involving dishonored cheques under Section 138.',
    familyLawDesc: 'Guiding clients through divorce, custody, and other family matters.',
    domesticDesc: 'Protection and legal remedies for victims of domestic violence.',
    mutualDesc: 'Simplified legal process for couples who mutually agree to divorce.',
    divorceDesc: 'Legal representation in contested divorce cases covering alimony and child custody.',
    marriageDesc: 'Assistance with legal registration of marriage under various personal laws.',
    willDesc: 'Drafting legally binding wills to ensure proper distribution of assets.',
    partnershipDesc: 'Creating legally sound partnership deeds for business relationships.',
    noticeDesc: 'Drafting and sending formal legal notices for dispute resolution.',
    registryDesc: 'Assistance with property registration, transfer, and documentation.',
    disputesDesc: 'Resolution of property boundary, ownership, and inheritance disputes.',
    propertyDisputesDesc: 'Resolving property conflicts through negotiation and litigation.',
    agreementsDesc: 'Drafting and reviewing various legal agreements and contracts.',
    consumerDesc: 'Filing and pursuing consumer complaints against unfair trade practices.',
    
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
    
    // Services home page
    ourServices: 'हमारी सेवाएँ',
    viewAllServices: 'सभी सेवाएँ देखें',
    servicesIntro: 'आपकी जरूरतों के अनुसार व्यापक कानूनी सेवाएं',
    
    // Services page - Service titles
    civilRights: 'नागरिक अधिकार',
    disabilityBenefits: 'विकलांगता लाभ',
    criminalLaw: 'आपराधिक कानून',
    propertyDisputes: 'संपत्ति विवाद',
    familyLaw: 'पारिवारिक कानून',
    
    // Services page - Service descriptions
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
    
    // Services page - Overview
    ourLegalServices: 'हमारी कानूनी सेवाएँ',
    experienceTagline: 'व्यक्तियों और व्यवसायों के लिए व्यापक कानूनी सहायता, एक दशक से अधिक के अनुभव के साथ।',
    
    // Services page - Process section
    ourLegalProcess: 'हमारी कानूनी प्रक्रिया',
    processTagline: 'हमारा व्यवस्थित दृष्टिकोण शुरू से अंत तक आपके कानूनी मामलों की पूरी तरह से देखभाल सुनिश्चित करता है।',
    initialConsultation: 'प्रारंभिक परामर्श',
    consultationDesc: 'हम आपकी स्थिति और कानूनी आवश्यकताओं पर विस्तार से चर्चा करते हैं।',
    caseAnalysis: 'केस विश्लेषण',
    analysisDesc: 'हमारे विशेषज्ञ आपके मामले का मूल्यांकन करते हैं और एक रणनीतिक दृष्टिकोण विकसित करते हैं।',
    legalRepresentation: 'कानूनी प्रतिनिधित्व',
    representationDesc: 'हम बातचीत और अदालती कार्यवाही में आपके हितों का प्रतिनिधित्व करते हैं।',
    resolution: 'समाधान',
    resolutionDesc: 'हम आपके कानूनी मामले के लिए एक अनुकूल परिणाम की ओर काम करते हैं।',
    readyForSupport: 'कानूनी सहायता के लिए तैयार हैं?',
    bookConsultation: 'परामर्श बुक करें',
    
    // Services page - Category titles
    civilLaw: 'नागरिक कानून',
    criminalLaw: 'आपराधिक कानून',
    familyLaw: 'पारिवारिक कानून',
    propertyDocumentation: 'संपत्ति दस्तावेज़ीकरण',
    consumerProtection: 'उपभोक्ता संरक्षण',
    
    // Services page - Service titles (continued)
    evictionLitigation: 'बेदखली मुकदमा',
    landlordTenant: 'मकान मालिक-किरायेदार विवाद',
    recoverySuit: 'वसूली वाद',
    criminalWrit: 'आपराधिक रिट',
    regularBail: 'नियमित जमानत',
    anticipatoryBail: 'अग्रिम जमानत',
    chequeBouncing: 'चेक बाउंसिंग',
    domesticViolence: 'घरेलू हिंसा',
    mutualDivorce: 'आपसी सहमति से तलाक',
    divorce: 'तलाक',
    registerMarriage: 'विवाह पंजीकरण',
    willWriting: 'वसीयत लेखन',
    partnershipDeed: 'साझेदारी विलेख',
    legalNotice: 'कानूनी नोटिस',
    propertyRegistry: 'संपत्ति पंजीकरण',
    agreements: 'अनुबंध',
    consumerComplaint: 'उपभोक्ता शिकायत',
    
    // Services page - Service descriptions (continued)
    evictionDesc: 'बेदखली का सामना कर रहे किरायेदारों या बेदखल करने वाले मकान मालिकों के लिए विशेषज्ञ कानूनी प्रतिनिधित्व।',
    landlordDesc: 'मकान मालिकों और किरायेदारों के बीच विवादों का समाधान, जिसमें लीज उल्लंघन और संपत्ति क्षति शामिल है।',
    recoveryDesc: 'प्रभावी मुकदमेबाजी के माध्यम से ऋण, धन और संपत्ति की वसूली के लिए कानूनी सहायता।',
    criminalWritDesc: 'आपराधिक कार्यवाही में मौलिक अधिकारों की रक्षा के लिए आपराधिक रिट दायर करना और बचाव करना।',
    regularBailDesc: 'आपराधिक मामलों में गिरफ्तारी के बाद जमानत प्राप्त करने के लिए कानूनी प्रतिनिधित्व।',
    anticipatoryDesc: 'गैर-जमानती अपराधों में गिरफ्तारी को रोकने के लिए पूर्व-गिरफ्तारी जमानत आवेदन।',
    chequeDesc: 'धारा 138 के तहत अस्वीकृत चेकों से जुड़े मामलों के लिए कानूनी सहायता।',
    domesticDesc: 'घरेलू हिंसा के पीड़ितों के लिए सुरक्षा और कानूनी उपाय।',
    mutualDesc: 'उन जोड़ों के लिए सरलीकृत कानूनी प्रक्रिया जो आपसी सहमति से तलाक के लिए सहमत होते हैं।',
    divorceDesc: 'विवादित तलाक के मामलों में कानूनी प्रतिनिधित्व जिसमें भरण-पोषण और बच्चों की हिरासत शामिल है।',
    marriageDesc: 'विभिन्न व्यक्तिगत कानूनों के तहत विवाह के कानूनी पंजीकरण में सहायता।',
    willDesc: 'संपत्तियों के उचित वितरण को सुनिश्चित करने के लिए कानूनी रूप से बाध्यकारी वसीयत का मसौदा तैयार करना।',
    partnershipDesc: 'व्यावसायिक संबंधों के लिए कानूनी रूप से मजबूत साझेदारी विलेख बनाना।',
    noticeDesc: 'विवाद समाधान के लिए औपचारिक कानूनी नोटिस का मसौदा तैयार करना और भेजना।',
    registryDesc: 'संपत्ति पंजीकरण, हस्तांतरण और दस्तावेज़ीकरण में सहायता।',
    disputesDesc: 'संपत्ति सीमा, स्वामित्व और विरासत विवादों का समाधान।',
    agreementsDesc: 'विभिन्न कानूनी समझौतों और अनुबंधों का मसौदा तैयार करना और समीक्षा करना।',
    consumerDesc: 'अनुचित व्यापार प्रथाओं के खिलाफ उपभोक्ता शिकायतें दर्ज करना और आगे बढ़ाना।',
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
    
    // Services home page
    ourServices: 'आमच्या सेवा',
    viewAllServices: 'सर्व सेवा पहा',
    servicesIntro: 'तुमच्या गरजांनुसार सर्वसमावेशक कायदेशीर सेवा',
    
    // Services page - Service titles
    civilRights: 'नागरी हक्क',
    disabilityBenefits: 'अपंगत्व लाभ',
    criminalLaw: 'फौजदारी कायदा',
    propertyDisputes: 'मालमत्ता वाद',
    familyLaw: 'कौटुंबिक कायदा',
    
    // Services page - Service descriptions
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
    
    // Services page - Overview
    ourLegalServices: 'आमच्या कायदेशीर सेवा',
    experienceTagline: 'व्यक्ती आणि व्यवसायांसाठी दशकापेक्षा जास्त अनुभवासह व्यापक कायदेशीर सहाय्य.',
    
    // Services page - Process section
    ourLegalProcess: 'आमची कायदेशीर प्रक्रिया',
    processTagline: 'आमचा पद्धतशीर दृष्टीकोन तुमच्या कायदेशीर प्रकरणांची सुरुवातीपासून शेवटपर्यंत पूर्ण देखभाल सुनिश्चित करतो.',
    initialConsultation: 'प्राथमिक सल्लामसलत',
    consultationDesc: 'आम्ही तुमची परिस्थिती आणि कायदेशीर गरजांची सविस्तर चर्चा करतो.',
    caseAnalysis: 'प्रकरण विश्लेषण',
    analysisDesc: 'आमचे तज्ञ तुमच्या प्रकरणाचे मूल्यांकन करतात आणि रणनीतिक दृष्टिकोन विकसित करतात.',
    legalRepresentation: 'कायदेशीर प्रतिनिधित्व',
    representationDesc: 'आम्ही वाटाघाटी आणि न्यायालयीन कार्यवाहीत तुमच्या हितांचे प्रतिनिधित्व करतो.',
    resolution: 'निराकरण',
    resolutionDesc: 'आम्ही तुमच्या कायदेशीर प्रकरणासाठी अनुकूल परिणामासाठी कार्य करतो.',
    readyForSupport: 'कायदेशीर सहाय्यासाठी तयार आहात?',
    bookConsultation: 'सल्लामसलत बुक करा',
    
    // Services page - Category titles
    civilLaw: 'नागरी कायदा',
    criminalLaw: 'फौजदारी कायदा',
    familyLaw: 'कौटुंबिक कायदा',
    propertyDocumentation: 'मालमत्ता दस्तऐवजीकरण',
    consumerProtection: 'ग्राहक संरक्षण',
    
    // Services page - Service titles (continued)
    evictionLitigation: 'बेदखल मुकदमा',
    landlordTenant: 'मालक-भाडेकरू वाद',
    recoverySuit: 'वसुली दावा',
    criminalWrit: 'फौजदारी रिट',
    regularBail: 'नियमित जामीन',
    anticipatoryBail: 'अग्रिम जामीन',
    chequeBouncing: 'चेक बाउन्सिंग',
    domesticViolence: 'कौटुंबिक हिंसाचार',
    mutualDivorce: 'सामंजस्य घटस्फोट',
    divorce: 'घटस्फोट',
    registerMarriage: 'विवाह नोंदणी',
    willWriting: 'मृत्युपत्र लेखन',
    partnershipDeed: 'भागीदारी करार',
    legalNotice: 'कायदेशीर नोटीस',
    propertyRegistry: 'मालमत्ता नोंदणी',
    agreements: 'करार',
    consumerComplaint: 'ग्राहक तक्रार',
    
    // Services page - Service descriptions (continued)
    evictionDesc: 'बेदखल होणाऱ्या भाडेकरूंसाठी किंवा बेदखल करू इच्छिणाऱ्या मालकांसाठी तज्ञ कायदेशीर प्रतिनिधित्व.',
    landlordDesc: 'मालक आणि भाडेकरू यांच्यातील वाद सोडवणे, ज्यामध्ये लीज उल्लंघन आणि मालमत्ता नुकसान समाविष्ट आहे.',
    recoveryDesc: 'प्रभावी कायदेशीर कारवाईद्वारे कर्ज, पैसे आणि मालमत्ता वसूल करण्यासाठी कायदेशीर सहाय्य.',
    criminalWritDesc: 'फौजदारी प्रक्रियेमध्ये मूलभूत हक्कांच्या संरक्षणासाठी फौजदारी रिट दाखल करणे आणि बचाव करणे.',
    regularBailDesc: 'फौजदारी प्रकरणात अटक केल्यानंतर जामीन मिळवण्यासाठी कायदेशीर प्रतिनिधित्व.',
    anticipatoryDesc: 'बिगर-जामिनपात्र गुन्ह्यांमध्ये अटकेला प्रतिबंधित करण्यासाठी अटकपूर्व जामीन अर्ज.',
    chequeDesc: 'कलम 138 अंतर्गत अनादरित धनादेशांशी संबंधित प्रकरणांसाठी कायदेशीर सहाय्य.',
    domesticDesc: 'कौटुंबिक हिंसाचाराच्या पीडितांसाठी संरक्षण आणि कायदेशीर उपाय.',
    mutualDesc: 'जी जोडपी परस्पर संमतीने घटस्फोटास सहमत होतात त्यांच्यासाठी सुलभ कायदेशीर प्रक्रिया.',
    divorceDesc: 'पोटगी आणि मुलांच्या ताब्यासह वादग्रस्त घटस्फोट प्रकरणांमध्ये कायदेशीर प्रतिनिधित्व.',
    marriageDesc: 'विविध वैयक्तिक कायद्यांअंतर्गत विवाहाच्या कायदेशीर नोंदणीसाठी सहाय्य.',
    willDesc: 'मालमत्तेचे योग्य वितरण सुनिश्चित करण्यासाठी कायदेशीर बंधनकारक मृत्युपत्र तयार करणे.',
    partnershipDesc: 'व्यावसायिक संबंधांसाठी कायदेशीर मजबूत भागीदारी कराराची निर्मिती.',
    noticeDesc: 'वाद निराकरणासाठी औपचारिक कायदेशीर नोटीसचे मसुदा तयार करणे आणि पाठवणे.',
    registryDesc: 'मालमत्ता नोंदणी, हस्तांतरण आणि दस्तऐवजीकरणामध्ये सहाय्य.',
    disputesDesc: 'मालमत्ता सीमा, मालकी आणि वारसा वादांचे निराकरण.',
    agreementsDesc: 'विविध कायदेशीर करार आणि कंत्राटांचे मसुदा तयार करणे आणि पुनरावलोकन करणे.',
    consumerDesc: 'अनुचित व्यापारी पद्धतींविरुद्ध ग्राहक तक्रारी दाखल करणे आणि पाठपुरावा करणे.',
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
