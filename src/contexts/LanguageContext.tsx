
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Comprehensive translations for the entire website
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'home': 'Home',
    'services': 'Services',
    'contact': 'Contact',
    'advocate': 'Advocate',
    'bookAppointment': 'Book Appointment',
    
    // Forms
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'message': 'Message',
    'submit': 'Submit',
    
    // Contact Page
    'address': 'Address',
    'callUs': 'Call Us',
    'emailUs': 'Email Us',
    'visitUs': 'Visit Us',
    'officeHours': 'Office Hours',
    'mondayToSaturday': 'Monday - Saturday: 9:00 AM - 7:00 PM',
    'sunday': 'Sunday: Closed',
    'getInTouch': 'Get in Touch',
    'sendUsMessage': 'Send Us a Message',
    'scheduleAppointment': 'Schedule an Appointment',
    'ourLocation': 'Our Location',
    'visitOffice': 'Visit our office located at Buddh Nagar, Indora Square, Nagpur for in-person consultations.',
    'convenientlyLocated': 'We\'re conveniently located near major landmarks in Nagpur. If you need help with directions, please don\'t hesitate to call us.',
    'connectWhatsapp': 'Connect on WhatsApp',
    'whatsappResponse': 'For quick responses, reach out to us on WhatsApp. We\'re available during business hours to assist you.',
    'connectOnWhatsapp': 'Connect on WhatsApp',
    
    // Services Page
    'ourLegalServices': 'Our Legal Services',
    'experienceTagline': 'With over 12 years of experience, we offer comprehensive legal solutions tailored to meet your specific needs. Browse our range of services below.',
    'civilLaw': 'Civil Law',
    'criminalLaw': 'Criminal Law',
    'familyLaw': 'Family Law',
    'propertyDocumentation': 'Property & Documentation',
    'consumerProtection': 'Consumer Protection',
    'ourLegalProcess': 'Our Legal Process',
    'processTagline': 'We follow a structured approach to ensure effective resolution of your legal matters. Here\'s how we work to address your needs.',
    'initialConsultation': 'Initial Consultation',
    'consultationDesc': 'We discuss your case and understand your specific legal needs',
    'caseAnalysis': 'Case Analysis',
    'analysisDesc': 'We evaluate your situation and develop a strategic legal approach',
    'legalRepresentation': 'Legal Representation',
    'representationDesc': 'We advocate on your behalf in negotiations or court proceedings',
    'resolution': 'Resolution',
    'resolutionDesc': 'We work diligently to achieve the best possible outcome for your case',
    'readyForSupport': 'Ready to Get Legal Support?',
    'scheduleConsultation': 'Schedule a consultation with Adv. Jasvinder Singh Ply to discuss your legal needs and explore how we can assist you.',
    'bookConsultation': 'Book Your Consultation',

    // Home Page
    'aboutTagline': 'About',
    'expYears': '12+ years in legal field',
    'aboutDesc1': 'With over 12 years of experience in the legal field, Adv. Jasvinder Singh Ply has established himself as a respected legal practitioner in Nagpur, specializing in various aspects of civil, criminal, and family law.',
    'aboutDesc2': 'His practice is built on the principles of integrity, dedication, and personalized attention to each client\'s unique legal needs. Adv. Singh is committed to providing accessible legal services while maintaining the highest standards of professional ethics.',
    'aboutDesc3': 'Whether you\'re facing a complex legal challenge or simply need sound legal advice, Adv. Jasvinder Singh Ply brings his wealth of experience and deep understanding of the law to help you navigate the legal system effectively.',
    'scheduleCons': 'Schedule a Consultation',
    'servicesPreview': 'Our Legal Services',
    'servicesPreviewDesc': 'We provide comprehensive legal services to meet your various needs. Our team is dedicated to offering personalized solutions tailored to your specific circumstances.',
    'viewAllServices': 'View All Services',
    'whyChooseUs': 'Why Choose Us',
    'expLegalExpertise': 'Experienced Legal Expertise',
    'expLegalDesc': 'With over 12 years in the field, we bring deep knowledge and proven strategies to every case.',
    'personalizedApproach': 'Personalized Approach',
    'personalizedDesc': 'We recognize that each client\'s situation is unique and tailor our services accordingly.',
    'clearCommunication': 'Clear Communication',
    'clearCommDesc': 'We explain complex legal matters in straightforward terms so you can make informed decisions.',
    'accessibility': 'Accessibility',
    'accessibilityDesc': 'We\'re responsive to your questions and concerns throughout the legal process.',
    'clientTestimonials': 'Client Testimonials',
    'testimonial1': '"Adv. Jasvinder handled my property dispute case with utmost professionalism and expertise. His guidance throughout the process was invaluable."',
    'testimonial1Author': '- Rajesh Kumar, Nagpur',
    'testimonial2': '"I was impressed by the detailed attention given to my case and the successful resolution. Highly recommend for any legal matters."',
    'testimonial2Author': '- Priya Sharma, Nagpur',
    'needLegal': 'Need Legal Assistance?',
    'needLegalDesc': 'Whether you\'re facing a legal challenge or need advice on a specific matter, our team is ready to help you navigate the complexities of the legal system.',
    'learnMoreServices': 'Learn More About Our Services',

    // Footer
    'contactUs': 'Contact Us',
    'quickLinks': 'Quick Links',
    'practiceAreas': 'Practice Areas',
    'allRightsReserved': 'All rights reserved.',
    'legalExcellence': 'Years of Legal Excellence',

    // Service descriptions
    'civilRights': 'Civil Rights Litigation',
    'civilRightsDesc': 'Representation in cases involving violations of civil rights and constitutional protections.',
    'disabilityBenefits': 'Disability Benefits Litigation',
    'disabilityDesc': 'Assistance with claims for disability benefits, including accident claims and compensation.',
    'evictionLitigation': 'Eviction Litigation',
    'evictionDesc': 'Legal representation for landlords or tenants in eviction proceedings.',
    'landlordTenant': 'Landlord and Tenant Litigation',
    'landlordDesc': 'Resolution of disputes between landlords and tenants regarding leases, rent, and property conditions.',
    'recoverySuit': 'Recovery Suit',
    'recoveryDesc': 'Legal action to recover money or property owed through court proceedings.',
    'criminalWrit': 'Criminal Writ Petition',
    'criminalWritDesc': 'Filing of writ petitions challenging criminal proceedings or seeking relief in criminal matters.',
    'regularBail': 'Regular Bail',
    'regularBailDesc': 'Representation for obtaining bail for accused persons after arrest.',
    'anticipatoryBail': 'Anticipatory Bail',
    'anticipatoryDesc': 'Pre-arrest bail applications to prevent arrest in cases where charges are anticipated.',
    'chequeBouncing': 'Negotiable Instrument (Cheque Bouncing)',
    'chequeDesc': 'Legal representation in cases under Section 138 of the Negotiable Instruments Act.',
    'domesticViolence': 'Domestic Violence Cases',
    'domesticDesc': 'Legal support and protection for victims of domestic violence.',
    'mutualDivorce': 'Mutual Divorce',
    'mutualDesc': 'Assistance with uncontested divorce proceedings where both parties agree to separate.',
    'divorce': 'Divorce',
    'divorceDesc': 'Representation in contested divorce cases, handling all aspects of the dissolution of marriage.',
    'registerMarriage': 'Register Marriage',
    'marriageDesc': 'Legal assistance with the registration of marriages under various personal laws.',
    'willWriting': 'Will Writing',
    'willDesc': 'Drafting legally sound wills to ensure proper distribution of assets according to your wishes.',
    'partnershipDeed': 'Partnership Deed Registration',
    'partnershipDesc': 'Preparation and registration of partnership deeds for business entities.',
    'legalNotice': 'Legal Notice',
    'noticeDesc': 'Drafting and sending formal legal notices on behalf of clients.',
    'propertyRegistry': 'Property Registry (Transfer/Sale)',
    'registryDesc': 'Handling legal documentation for property transfers, sales, and registrations.',
    'propertyDisputes': 'Property Disputes',
    'disputesDesc': 'Resolution of disputes regarding ownership, boundaries, or inheritance of property.',
    'agreements': 'Agreements (Sales/Services/MOU)',
    'agreementsDesc': 'Drafting and review of various legal agreements to protect your interests.',
    'consumerComplaint': 'Consumer Complaint',
    'consumerDesc': 'Representation in consumer disputes against products or services that failed to meet standards.'
  },
  hi: {
    // Navbar
    'home': 'होम',
    'services': 'सेवाएं',
    'contact': 'संपर्क',
    'advocate': 'अधिवक्ता',
    'bookAppointment': 'अपॉइंटमेंट बुक करें',
    
    // Forms
    'name': 'नाम',
    'email': 'ईमेल',
    'phone': 'फोन',
    'message': 'संदेश',
    'submit': 'सबमिट करें',
    
    // Contact Page
    'address': 'पता',
    'callUs': 'हमें कॉल करें',
    'emailUs': 'हमें ईमेल करें',
    'visitUs': 'हमसे मिलें',
    'officeHours': 'कार्यालय समय',
    'mondayToSaturday': 'सोमवार - शनिवार: सुबह 9:00 - शाम 7:00',
    'sunday': 'रविवार: बंद',
    'getInTouch': 'संपर्क में रहें',
    'sendUsMessage': 'हमें संदेश भेजें',
    'scheduleAppointment': 'अपॉइंटमेंट शेड्यूल करें',
    'ourLocation': 'हमारा स्थान',
    'visitOffice': 'व्यक्तिगत परामर्श के लिए बुद्ध नगर, इंदोरा स्क्वायर, नागपुर में हमारे कार्यालय पर आएं।',
    'convenientlyLocated': 'हम नागपुर के प्रमुख स्थलों के पास सुविधाजनक रूप से स्थित हैं। यदि आपको दिशानिर्देशों की आवश्यकता है, तो कृपया हमें कॉल करें।',
    'connectWhatsapp': 'व्हाट्सएप पर जुड़ें',
    'whatsappResponse': 'त्वरित प्रतिक्रिया के लिए, व्हाट्सएप पर हमसे संपर्क करें। हम व्यावसायिक घंटों के दौरान आपकी सहायता के लिए उपलब्ध हैं।',
    'connectOnWhatsapp': 'व्हाट्सएप पर जुड़ें',
    
    // Services Page
    'ourLegalServices': 'हमारी कानूनी सेवाएं',
    'experienceTagline': '12 वर्षों से अधिक के अनुभव के साथ, हम आपकी विशिष्ट जरूरतों को पूरा करने के लिए व्यापक कानूनी समाधान प्रदान करते हैं। नीचे हमारी सेवाओं की श्रेणी देखें।',
    'civilLaw': 'सिविल कानून',
    'criminalLaw': 'आपराधिक कानून',
    'familyLaw': 'पारिवारिक कानून',
    'propertyDocumentation': 'संपत्ति और दस्तावेज़',
    'consumerProtection': 'उपभोक्ता संरक्षण',
    'ourLegalProcess': 'हमारी कानूनी प्रक्रिया',
    'processTagline': 'हम आपके कानूनी मामलों के प्रभावी समाधान सुनिश्चित करने के लिए एक संरचित दृष्टिकोण का पालन करते हैं। यहां बताया गया है कि हम आपकी ज़रूरतों को पूरा करने के लिए कैसे काम करते हैं।',
    'initialConsultation': 'प्रारंभिक परामर्श',
    'consultationDesc': 'हम आपके मामले पर चर्चा करते हैं और आपकी विशिष्ट कानूनी आवश्यकताओं को समझते हैं',
    'caseAnalysis': 'केस विश्लेषण',
    'analysisDesc': 'हम आपकी स्थिति का मूल्यांकन करते हैं और एक रणनीतिक कानूनी दृष्टिकोण विकसित करते हैं',
    'legalRepresentation': 'कानूनी प्रतिनिधित्व',
    'representationDesc': 'हम बातचीत या अदालती कार्यवाही में आपकी ओर से वकालत करते हैं',
    'resolution': 'समाधान',
    'resolutionDesc': 'हम आपके मामले के लिए सर्वोत्तम संभव परिणाम प्राप्त करने के लिए परिश्रम से काम करते हैं',
    'readyForSupport': 'कानूनी सहायता के लिए तैयार हैं?',
    'scheduleConsultation': 'अपनी कानूनी जरूरतों पर चर्चा करने और यह जानने के लिए कि हम आपकी कैसे सहायता कर सकते हैं, अधिवक्ता जसविंदर सिंह प्लाई के साथ परामर्श शेड्यूल करें।',
    'bookConsultation': 'अपना परामर्श बुक करें',

    // Home Page
    'aboutTagline': 'के बारे में',
    'expYears': 'कानूनी क्षेत्र में 12+ वर्षों का अनुभव',
    'aboutDesc1': 'कानूनी क्षेत्र में 12 वर्षों से अधिक के अनुभव के साथ, अधिवक्ता जसविंदर सिंह प्लाई ने स्वयं को नागपुर में एक सम्मानित कानूनी व्यवसायी के रूप में स्थापित किया है, जो सिविल, आपराधिक और पारिवारिक कानून के विभिन्न पहलुओं में विशेषज्ञता रखते हैं।',
    'aboutDesc2': 'उनका अभ्यास अखंडता, समर्पण और प्रत्येक ग्राहक की अनूठी कानूनी जरूरतों के लिए व्यक्तिगत ध्यान के सिद्धांतों पर आधारित है। अधिवक्ता सिंह पेशेवर नैतिकता के उच्चतम मानकों को बनाए रखते हुए सुलभ कानूनी सेवाएं प्रदान करने के लिए प्रतिबद्ध हैं।',
    'aboutDesc3': 'चाहे आप एक जटिल कानूनी चुनौती का सामना कर रहे हों या बस सही कानूनी सलाह की आवश्यकता हो, अधिवक्ता जसविंदर सिंह प्लाई अपने अनुभव और कानून की गहरी समझ के साथ आपको प्रभावी ढंग से कानूनी प्रणाली को नेविगेट करने में मदद करते हैं।',
    'scheduleCons': 'परामर्श शेड्यूल करें',
    'servicesPreview': 'हमारी कानूनी सेवाएं',
    'servicesPreviewDesc': 'हम आपकी विभिन्न जरूरतों को पूरा करने के लिए व्यापक कानूनी सेवाएं प्रदान करते हैं। हमारी टीम आपकी विशिष्ट परिस्थितियों के अनुरूप व्यक्तिगत समाधान प्रदान करने के लिए समर्पित है।',
    'viewAllServices': 'सभी सेवाएं देखें',
    'whyChooseUs': 'हमें क्यों चुनें',
    'expLegalExpertise': 'अनुभवी कानूनी विशेषज्ञता',
    'expLegalDesc': 'इस क्षेत्र में 12 वर्षों से अधिक के अनुभव के साथ, हम हर मामले में गहन ज्ञान और सिद्ध रणनीतियों को लाते हैं।',
    'personalizedApproach': 'व्यक्तिगत दृष्टिकोण',
    'personalizedDesc': 'हम मानते हैं कि प्रत्येक ग्राहक की स्थिति अनूठी होती है और तदनुसार अपनी सेवाओं को अनुकूलित करते हैं।',
    'clearCommunication': 'स्पष्ट संचार',
    'clearCommDesc': 'हम जटिल कानूनी मामलों को सरल शब्दों में समझाते हैं ताकि आप सूचित निर्णय ले सकें।',
    'accessibility': 'पहुंच',
    'accessibilityDesc': 'हम कानूनी प्रक्रिया के दौरान आपके प्रश्नों और चिंताओं के प्रति उत्तरदायी हैं।',
    'clientTestimonials': 'ग्राहक प्रशंसापत्र',
    'testimonial1': '"अधिवक्ता जसविंदर ने मेरे संपत्ति विवाद मामले को अत्यधिक पेशेवर और विशेषज्ञता के साथ संभाला। पूरी प्रक्रिया के दौरान उनका मार्गदर्शन अमूल्य था।"',
    'testimonial1Author': '- राजेश कुमार, नागपुर',
    'testimonial2': '"मैं अपने मामले पर दी गई विस्तृत ध्यान और सफल समाधान से प्रभावित था। किसी भी कानूनी मामले के लिए अत्यधिक अनुशंसित।"',
    'testimonial2Author': '- प्रिया शर्मा, नागपुर',
    'needLegal': 'कानूनी सहायता की आवश्यकता है?',
    'needLegalDesc': 'चाहे आप कानूनी चुनौती का सामना कर रहे हों या किसी विशिष्ट मामले पर सलाह की आवश्यकता हो, हमारी टीम आपको कानूनी प्रणाली की जटिलताओं को नेविगेट करने में मदद करने के लिए तैयार है।',
    'learnMoreServices': 'हमारी सेवाओं के बारे में अधिक जानें',

    // Footer
    'contactUs': 'संपर्क करें',
    'quickLinks': 'त्वरित लिंक',
    'practiceAreas': 'अभ्यास क्षेत्र',
    'allRightsReserved': 'सर्वाधिकार सुरक्षित।',
    'legalExcellence': 'वर्षों का कानूनी उत्कृष्टता',

    // Service descriptions
    'civilRights': 'नागरिक अधिकार मुकदमेबाजी',
    'civilRightsDesc': 'नागरिक अधिकारों और संवैधानिक संरक्षण के उल्लंघन से संबंधित मामलों में प्रतिनिधित्व।',
    'disabilityBenefits': 'विकलांगता लाभ मुकदमेबाजी',
    'disabilityDesc': 'दुर्घटना दावों और मुआवजे सहित विकलांगता लाभ के दावों के साथ सहायता।',
    'evictionLitigation': 'बेदखली मुकदमेबाजी',
    'evictionDesc': 'बेदखली कार्यवाही में मकान मालिकों या किरायेदारों के लिए कानूनी प्रतिनिधित्व।',
    'landlordTenant': 'मकान मालिक और किरायेदार मुकदमेबाजी',
    'landlordDesc': 'लीज, किराए और संपत्ति की स्थिति के संबंध में मकान मालिकों और किरायेदारों के बीच विवादों का समाधान।',
    'recoverySuit': 'रिकवरी सूट',
    'recoveryDesc': 'अदालती कार्यवाही के माध्यम से बकाया धन या संपत्ति की वसूली के लिए कानूनी कार्रवाई।',
    'criminalWrit': 'आपराधिक रिट याचिका',
    'criminalWritDesc': 'आपराधिक कार्यवाही को चुनौती देने या आपराधिक मामलों में राहत मांगने के लिए रिट याचिका दायर करना।',
    'regularBail': 'नियमित जमानत',
    'regularBailDesc': 'गिरफ्तारी के बाद आरोपित व्यक्तियों के लिए जमानत प्राप्त करने के लिए प्रतिनिधित्व।',
    'anticipatoryBail': 'अग्रिम जमानत',
    'anticipatoryDesc': 'उन मामलों में गिरफ्तारी को रोकने के लिए पूर्व-गिरफ्तारी जमानत आवेदन जहां आरोप अनुमानित हैं।',
    'chequeBouncing': 'परक्राम्य लिखत (चेक बाउंसिंग)',
    'chequeDesc': 'परक्राम्य लिखत अधिनियम की धारा 138 के तहत मामलों में कानूनी प्रतिनिधित्व।',
    'domesticViolence': 'घरेलू हिंसा के मामले',
    'domesticDesc': 'घरेलू हिंसा के पीड़ितों के लिए कानूनी समर्थन और सुरक्षा।',
    'mutualDivorce': 'आपसी सहमति से तलाक',
    'mutualDesc': 'अविवादित तलाक कार्यवाही में सहायता जहां दोनों पक्ष अलग होने के लिए सहमत हैं।',
    'divorce': 'तलाक',
    'divorceDesc': 'विवादित तलाक मामलों में प्रतिनिधित्व, विवाह विघटन के सभी पहलुओं को संभालना।',
    'registerMarriage': 'विवाह पंजीकरण',
    'marriageDesc': 'विभिन्न व्यक्तिगत कानूनों के तहत विवाह के पंजीकरण के लिए कानूनी सहायता।',
    'willWriting': 'वसीयत लिखना',
    'willDesc': 'आपकी इच्छाओं के अनुसार संपत्ति के उचित वितरण को सुनिश्चित करने के लिए कानूनी रूप से सही वसीयतनामा तैयार करना।',
    'partnershipDeed': 'साझेदारी विलेख पंजीकरण',
    'partnershipDesc': 'व्यावसायिक संस्थाओं के लिए साझेदारी विलेख की तैयारी और पंजीकरण।',
    'legalNotice': 'कानूनी नोटिस',
    'noticeDesc': 'ग्राहकों की ओर से औपचारिक कानूनी नोटिस तैयार करना और भेजना।',
    'propertyRegistry': 'संपत्ति रजिस्ट्री (हस्तांतरण/बिक्री)',
    'registryDesc': 'संपत्ति हस्तांतरण, बिक्री और पंजीकरण के लिए कानूनी दस्तावेज़ीकरण का प्रबंधन।',
    'propertyDisputes': 'संपत्ति विवाद',
    'disputesDesc': 'स्वामित्व, सीमाओं या संपत्ति के विरासत से संबंधित विवादों का समाधान।',
    'agreements': 'समझौते (बिक्री/सेवाएं/एमओयू)',
    'agreementsDesc': 'आपके हितों की रक्षा के लिए विभिन्न कानूनी समझौतों का मसौदा तैयार करना और समीक्षा करना।',
    'consumerComplaint': 'उपभोक्ता शिकायत',
    'consumerDesc': 'उन उत्पादों या सेवाओं के खिलाफ उपभोक्ता विवादों में प्रतिनिधित्व जो मानकों को पूरा करने में विफल रहे।'
  },
  mr: {
    // Navbar
    'home': 'मुख्यपृष्ठ',
    'services': 'सेवा',
    'contact': 'संपर्क',
    'advocate': 'वकील',
    'bookAppointment': 'अपॉइंटमेंट बुक करा',
    
    // Forms
    'name': 'नाव',
    'email': 'ईमेल',
    'phone': 'फोन',
    'message': 'संदेश',
    'submit': 'सबमिट करा',
    
    // Contact Page
    'address': 'पत्ता',
    'callUs': 'आम्हाला कॉल करा',
    'emailUs': 'आम्हाला ईमेल करा',
    'visitUs': 'आम्हाला भेट द्या',
    'officeHours': 'कार्यालय वेळ',
    'mondayToSaturday': 'सोमवार - शनिवार: सकाळी 9:00 - संध्याकाळी 7:00',
    'sunday': 'रविवार: बंद',
    'getInTouch': 'संपर्कात रहा',
    'sendUsMessage': 'आम्हाला संदेश पाठवा',
    'scheduleAppointment': 'अपॉइंटमेंट शेड्यूल करा',
    'ourLocation': 'आमचं स्थान',
    'visitOffice': 'व्यक्तिगत सल्ल्यासाठी बुद्ध नगर, इंदोरा स्क्वेअर, नागपूर येथे आमच्या कार्यालयास भेट द्या.',
    'convenientlyLocated': 'आम्ही नागपूरमधील प्रमुख लँडमार्क्सच्या जवळ सुविधाजनकरित्या स्थित आहोत. दिशानिर्देशांसाठी मदत हवी असल्यास, कृपया आम्हाला कॉल करा.',
    'connectWhatsapp': 'व्हाट्सअॅपवर कनेक्ट व्हा',
    'whatsappResponse': 'जलद प्रतिसादासाठी, आमच्याशी व्हाट्सअॅपवर संपर्क साधा. आम्ही कार्यालयीन वेळेत आपल्या मदतीसाठी उपलब्ध आहोत.',
    'connectOnWhatsapp': 'व्हाट्सअॅपवर कनेक्ट व्हा',
    
    // Services Page
    'ourLegalServices': 'आमच्या कायदेशीर सेवा',
    'experienceTagline': '12 वर्षांहून अधिक अनुभवासह, आम्ही आपल्या विशिष्ट गरजा पूर्ण करण्यासाठी सर्वंकष कायदेशीर उपाय देतो. खाली आमच्या सेवांची श्रेणी पहा.',
    'civilLaw': 'नागरी कायदा',
    'criminalLaw': 'फौजदारी कायदा',
    'familyLaw': 'कौटुंबिक कायदा',
    'propertyDocumentation': 'मालमत्ता आणि दस्तऐवज',
    'consumerProtection': 'ग्राहक संरक्षण',
    'ourLegalProcess': 'आमची कायदेशीर प्रक्रिया',
    'processTagline': 'आम्ही आपल्या कायदेशीर बाबींचा प्रभावी निर्णय सुनिश्चित करण्यासाठी एक संरचित दृष्टिकोन अनुसरतो. आम्ही आपल्या गरजा पूर्ण करण्यासाठी कसे काम करतो हे येथे आहे.',
    'initialConsultation': 'प्रारंभिक सल्ला',
    'consultationDesc': 'आम्ही आपल्या केसबद्दल चर्चा करतो आणि आपल्या विशिष्ट कायदेशीर गरजा समजून घेतो',
    'caseAnalysis': 'केस विश्लेषण',
    'analysisDesc': 'आम्ही आपल्या परिस्थितीचे मूल्यांकन करतो आणि एक रणनीतिक कायदेशीर दृष्टिकोन विकसित करतो',
    'legalRepresentation': 'कायदेशीर प्रतिनिधित्व',
    'representationDesc': 'आम्ही वाटाघाटी किंवा न्यायालयीन कार्यवाहीमध्ये आपल्या वतीने वकिली करतो',
    'resolution': 'निर्णय',
    'resolutionDesc': 'आम्ही आपल्या केससाठी शक्य तितका चांगला परिणाम मिळवण्यासाठी परिश्रमपूर्वक काम करतो',
    'readyForSupport': 'कायदेशीर सहाय्य मिळवण्यास तयार आहात का?',
    'scheduleConsultation': 'आपल्या कायदेशीर गरजांबद्दल चर्चा करण्यासाठी आणि आम्ही आपल्याला कशी मदत करू शकतो हे समजून घेण्यासाठी अॅड. जसविंदर सिंह प्लाय यांच्याशी सल्ला शेड्यूल करा.',
    'bookConsultation': 'आपला सल्ला बुक करा',

    // Home Page
    'aboutTagline': 'बद्दल',
    'expYears': 'कायदेशीर क्षेत्रात 12+ वर्षांचा अनुभव',
    'aboutDesc1': 'कायदेशीर क्षेत्रात 12 वर्षांहून अधिक अनुभवासह, अॅड. जसविंदर सिंह प्लाय यांनी स्वतःला नागपूरमध्ये नागरी, फौजदारी आणि कौटुंबिक कायद्याच्या विविध पैलूंमध्ये विशेषता असलेले एक सन्माननीय कायदेशीर व्यावसायिक म्हणून स्थापित केले आहे.',
    'aboutDesc2': 'त्यांचा व्यवसाय प्रामाणिकता, समर्पण आणि प्रत्येक ग्राहकाच्या अनन्य कायदेशीर गरजांसाठी वैयक्तिक लक्ष देण्याच्या तत्त्वांवर आधारित आहे. अॅड. सिंह व्यावसायिक नीतिमत्तेचे सर्वोच्च मानक राखून प्रवेशयोग्य कायदेशीर सेवा प्रदान करण्यास वचनबद्ध आहेत.',
    'aboutDesc3': 'तुम्ही एखाद्या जटिल कायदेशीर आव्हानाला सामोरे जात असाल किंवा केवळ चांगला कायदेशीर सल्ला हवा असेल, तर अॅड. जसविंदर सिंह प्लाय आपल्या अनुभवाचा आणि कायद्याची खोल समज आणून आपल्याला कायदेशीर प्रणाली प्रभावीपणे सांभाळण्यास मदत करतात.',
    'scheduleCons': 'सल्ला शेड्यूल करा',
    'servicesPreview': 'आमच्या कायदेशीर सेवा',
    'servicesPreviewDesc': 'आम्ही आपल्या विविध गरजा पूर्ण करण्यासाठी सर्वंकष कायदेशीर सेवा प्रदान करतो. आमची टीम आपल्या विशिष्ट परिस्थितीनुसार व्यक्तिगत उपाय देण्यासाठी समर्पित आहे.',
    'viewAllServices': 'सर्व सेवा पहा',
    'whyChooseUs': 'आम्हाला का निवडावे',
    'expLegalExpertise': 'अनुभवी कायदेशीर विशेषज्ञता',
    'expLegalDesc': 'क्षेत्रात 12 वर्षांहून अधिक अनुभवासह, आम्ही प्रत्येक केसमध्ये खोल ज्ञान आणि सिद्ध रणनीती आणतो.',
    'personalizedApproach': 'व्यक्तिगत दृष्टिकोन',
    'personalizedDesc': 'आम्हाला कळते की प्रत्येक ग्राहकाची परिस्थिती अनन्य असते आणि त्यानुसार आमच्या सेवा अनुरूप करतो.',
    'clearCommunication': 'स्पष्ट संवाद',
    'clearCommDesc': 'आम्ही गुंतागुंतीच्या कायदेशीर बाबी सरळ शब्दांत समजावून सांगतो जेणेकरून आपण माहितीपूर्ण निर्णय घेऊ शकता.',
    'accessibility': 'प्रवेशयोग्यता',
    'accessibilityDesc': 'आम्ही कायदेशीर प्रक्रियेदरम्यान आपल्या प्रश्नांना आणि चिंतांना प्रतिसाद देतो.',
    'clientTestimonials': 'ग्राहक टेस्टिमोनियल',
    'testimonial1': '"अॅड. जसविंदरने माझ्या मालमत्ता वादाच्या प्रकरणाचे अत्यंत व्यावसायिकता आणि विशेषज्ञतेने हाताळले. या प्रक्रियेदरम्यान त्यांचे मार्गदर्शन अमूल्य होते."',
    'testimonial1Author': '- राजेश कुमार, नागपूर',
    'testimonial2': '"मला माझ्या केसला दिलेल्या तपशीलवार लक्षामुळे आणि यशस्वी निर्णयामुळे प्रभावित झालो. कोणत्याही कायदेशीर बाबींसाठी अत्यंत शिफारस करतो."',
    'testimonial2Author': '- प्रिया शर्मा, नागपूर',
    'needLegal': 'कायदेशीर मदत हवी आहे का?',
    'needLegalDesc': 'तुम्ही कायदेशीर आव्हानाला सामोरे जात असाल किंवा एखाद्या विशिष्ट बाबीवर सल्ला हवा असेल, आमची टीम तुम्हाला कायदेशीर प्रणालीच्या गुंतागुंतीचा मार्ग दाखवण्यास मदत करण्यासाठी तयार आहे.',
    'learnMoreServices': 'आमच्या सेवांबद्दल अधिक जाणून घ्या',

    // Footer
    'contactUs': 'संपर्क साधा',
    'quickLinks': 'त्वरित लिंक्स',
    'practiceAreas': 'सराव क्षेत्रे',
    'allRightsReserved': 'सर्व हक्क राखीव.',
    'legalExcellence': 'वर्षांची कायदेशीर उत्कृष्टता',

    // Service descriptions
    'civilRights': 'नागरी अधिकार खटला',
    'civilRightsDesc': 'नागरी अधिकार आणि घटनात्मक संरक्षणाच्या उल्लंघनांसंबंधित प्रकरणांमध्ये प्रतिनिधित्व.',
    'disabilityBenefits': 'अपंगत्व लाभ खटला',
    'disabilityDesc': 'अपघात दावे आणि भरपाईसह अपंगत्व लाभांच्या दाव्यांसाठी मदत.',
    'evictionLitigation': 'बेदखल खटला',
    'evictionDesc': 'बेदखल कार्यवाहीमध्ये मालक किंवा भाडेकरूंसाठी कायदेशीर प्रतिनिधित्व.',
    'landlordTenant': 'मालक आणि भाडेकरू खटला',
    'landlordDesc': 'भाडे, भाडे आणि मालमत्तेच्या परिस्थितीसंबंधी मालक आणि भाडेकरूंमधील वादांचे निराकरण.',
    'recoverySuit': 'रिकव्हरी सूट',
    'recoveryDesc': 'न्यायालयीन कार्यवाहीद्वारे देय रकमेची किंवा मालमत्तेची वसुली करण्यासाठी कायदेशीर कारवाई.',
    'criminalWrit': 'फौजदारी रिट याचिका',
    'criminalWritDesc': 'फौजदारी कार्यवाहीला आव्हान देणाऱ्या किंवा फौजदारी प्रकरणांमध्ये मदत मागणाऱ्या रिट याचिका दाखल करणे.',
    'regularBail': 'नियमित जामीन',
    'regularBailDesc': 'अटक झालेल्या व्यक्तींना जामीन मिळवण्यासाठी प्रतिनिधित्व.',
    'anticipatoryBail': 'अँटिसिपेटरी जामीन',
    'anticipatoryDesc': 'अपेक्षित आरोपांच्या प्रकरणांमध्ये अटक रोखण्यासाठी पूर्व-अटक जामीन अर्ज.',
    'chequeBouncing': 'चलनयोग्य साधन (चेक बाउन्सिंग)',
    'chequeDesc': 'चलनयोग्य साधन कायद्याच्या कलम 138 अंतर्गत प्रकरणांमध्ये कायदेशीर प्रतिनिधित्व.',
    'domesticViolence': 'घरगुती हिंसाचाराची प्रकरणे',
    'domesticDesc': 'घरगुती हिंसाचाराच्या पीडितांसाठी कायदेशीर समर्थन आणि संरक्षण.',
    'mutualDivorce': 'परस्पर संमतीने घटस्फोट',
    'mutualDesc': 'अविवादित घटस्फोट कार्यवाहीमध्ये मदत जेथे दोन्ही पक्ष वेगळे होण्यास सहमत आहेत.',
    'divorce': 'घटस्फोट',
    'divorceDesc': 'विवादित घटस्फोट प्रकरणांमध्ये प्रतिनिधित्व, विवाह विघटनाच्या सर्व पैलूंचे व्यवस्थापन.',
    'registerMarriage': 'विवाह नोंदणी',
    'marriageDesc': 'विविध वैयक्तिक कायद्यांअंतर्गत विवाह नोंदणीसाठी कायदेशीर मदत.',
    'willWriting': 'मृत्युपत्र लिहिणे',
    'willDesc': 'आपल्या इच्छेनुसार मालमत्तेचे योग्य वितरण सुनिश्चित करण्यासाठी कायदेशीरदृष्ट्या मजबूत मृत्युपत्र तयार करणे.',
    'partnershipDeed': 'भागीदारी करारनामा नोंदणी',
    'partnershipDesc': 'व्यवसाय संस्थांसाठी भागीदारी करारनाम्याची तयारी आणि नोंदणी.',
    'legalNotice': 'कायदेशीर नोटीस',
    'noticeDesc': 'ग्राहकांच्या वतीने औपचारिक कायदेशीर नोटीस तयार करणे आणि पाठवणे.',
    'propertyRegistry': 'मालमत्ता रजिस्ट्री (हस्तांतरण/विक्री)',
    'registryDesc': 'मालमत्ता हस्तांतरण, विक्री आणि नोंदणीसाठी कायदेशीर दस्तऐवजीकरणाचे व्यवस्थापन.',
    'propertyDisputes': 'मालमत्ता वाद',
    'disputesDesc': 'मालकीहक्क, सीमा किंवा मालमत्तेच्या वारसाहक्कासंबंधी वादांचे निराकरण.',
    'agreements': 'करार (विक्री/सेवा/एमओयू)',
    'agreementsDesc': 'आपल्या हितांचे रक्षण करण्यासाठी विविध कायदेशीर करारांचा मसुदा तयार करणे आणि पुनरावलोकन.',
    'consumerComplaint': 'ग्राहक तक्रार',
    'consumerDesc': 'मानके पूर्ण करण्यात अयशस्वी ठरलेल्या उत्पादने किंवा सेवांविरुद्ध ग्राहक वादांमध्ये प्रतिनिधित्व.'
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
