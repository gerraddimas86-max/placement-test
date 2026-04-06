import React from 'react';

interface RadioOption {
  value: number;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
            selectedValue === option.value
              ? 'bg-blue-50 border border-blue-200'
              : 'hover:bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};