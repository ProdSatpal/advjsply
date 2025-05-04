
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
      
      <Button 
        onClick={handleWhatsAppContact}
        className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8 flex items-center justify-center gap-3"
      >
        <MessageSquare size={24} />
        {t('connectOnWhatsapp')}
      </Button>
    </div>
  );
};

export default ContactForm;
