
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  delay = 0,
  className = '' 
}) => {
  const { t } = useLanguage();

  return (
    <div 
      className={`group bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col ${className}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {icon && <div className="text-navy mb-4">{icon}</div>}
      <h3 className="text-xl font-serif text-navy mb-3 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-gray-700 flex-grow mb-4">{description}</p>
    </div>
  );
};

export default ServiceCard;
