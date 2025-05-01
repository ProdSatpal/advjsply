
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start">
          <Phone size={20} className="mr-3 text-gold flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-navy">Call Us</h3>
            <p className="text-gray-600">+91 XXXXXXXXXX</p>
            <p className="text-gray-600">+91 XXXXXXXXXX</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start">
          <Mail size={20} className="mr-3 text-gold flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-navy">Email Us</h3>
            <p className="text-gray-600 break-all">contact@jasvinderlegal.com</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start">
          <MapPin size={20} className="mr-3 text-gold flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-navy">Visit Us</h3>
            <p className="text-gray-600">At Buddh Nagar, Indora Square, Nagpur, Maharashtra 440017</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start">
          <Clock size={20} className="mr-3 text-gold flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-navy">Office Hours</h3>
            <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
