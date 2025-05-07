
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShinyButton } from '@/components/ui/shiny-button';

const ContactForm = () => {
  const { t } = useLanguage();
  
  const handleWhatsAppContact = () => {
    window.open(
      'https://wa.me/918857972717?text=I%20need%20your%20legal%20assistance%20on%20below%20matter%0A', 
      '_blank'
    );
  };

  return (
    <div className="text-center py-8">
      <p className="mb-6 text-lg">
        {t('whatsappContactDesc')}
      </p>
      
      <div className="flex justify-center">
        <ShinyButton 
          onClick={handleWhatsAppContact}
          className="bg-[#4285F4] hover:bg-[#3b78dc] text-white text-lg py-3 px-8 flex items-center justify-center gap-3"
        >
          <MessageSquare size={24} />
          {t('connectOnWhatsapp')}
        </ShinyButton>
      </div>
    </div>
  );
};

export default ContactForm;
