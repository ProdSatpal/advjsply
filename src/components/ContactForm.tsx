
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          full_name: formData.name,
          email: formData.email || null, // Email is optional
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      toast.success(t("messageSentSuccess"));
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t("errorSendingMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="name" className="block mb-2 text-base font-medium text-navy">
          {t("fullName")} <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("enterFullName")}
          required
          className="w-full bg-white text-gray-800 focus:ring-2 focus:ring-theme-blue focus:border-theme-blue placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="email" className="block mb-2 text-base font-medium text-navy">
            {t("email")}
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("enterEmail")}
            className="w-full bg-white text-gray-800 focus:ring-2 focus:ring-theme-blue focus:border-theme-blue placeholder:text-gray-400"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="block mb-2 text-base font-medium text-navy">
            {t("phone")} <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("enterPhone")}
            required
            className="w-full bg-white text-gray-800 focus:ring-2 focus:ring-theme-blue focus:border-theme-blue placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="block mb-2 text-base font-medium text-navy">
          {t("subject")} <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t("enterSubject")}
          required
          className="w-full bg-white text-gray-800 focus:ring-2 focus:ring-theme-blue focus:border-theme-blue placeholder:text-gray-400"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="block mb-2 text-base font-medium text-navy">
          {t("message")} <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("typeMessage")}
          rows={5}
          required
          className="w-full bg-white text-gray-800 focus:ring-2 focus:ring-theme-blue focus:border-theme-blue placeholder:text-gray-400"
        />
      </div>

      <Button 
        type="submit" 
        variant="navy"
        className="w-full text-base py-6 flex items-center justify-center" 
        disabled={isSubmitting}
      >
        <Send className="mr-2" />
        {isSubmitting ? t("sending") : t("sendMessage")}
      </Button>
    </form>
  );
};

export default ContactForm;
