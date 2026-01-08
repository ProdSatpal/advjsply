
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const SERVICES = [
  'Civil Rights Litigation',
  'Disability Benefits (Accident Claims)',
  'Eviction Litigation',
  'Landlord and Tenant Litigation',
  'Will Writing',
  'Criminal Writ Petition',
  'Regular Bail',
  'Anticipatory Bail',
  'Domestic Violence Cases',
  'Mutual Divorce',
  'Divorce',
  'Negotiable Instrument (Cheque Bouncing)',
  'Recovery Suit',
  'Consumer Complaint',
  'Partnership Deed Registration',
  'Register Marriage',
  'Legal Notice',
  'Property Registry',
  'Property Disputes',
  'Agreements (Sales/Services/MOU)'
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Appointment request sent successfully. We will contact you shortly.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 text-sm font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block mb-1 text-sm font-medium">
          Service <span className="text-red-500">*</span>
        </label>
        <Select onValueChange={handleServiceChange} value={formData.service}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block mb-1 text-sm font-medium">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="time" className="block mb-1 text-sm font-medium">
            Preferred Time <span className="text-red-500">*</span>
          </label>
          <Input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 text-sm font-medium">
          Brief Description of Your Case
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide a brief description of your case (optional)"
          rows={4}
          className="w-full"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-navy hover:bg-navy-light" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Book Appointment"}
      </Button>
    </form>
  );
};

export default AppointmentForm;
