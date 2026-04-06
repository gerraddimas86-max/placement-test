import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  className = '',
  padding = 'md'
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-5 py-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className={paddings[padding]}>
        {children}
      </div>
    </div>
  );
};