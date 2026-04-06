import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  const colors: Record<string, string> = {
    blue: 'border-blue-500 border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
    green: 'border-green-500 border-t-transparent',
  };
  
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};