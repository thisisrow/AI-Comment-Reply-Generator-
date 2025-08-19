
import React from 'react';

interface SliderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: number;
}

const SliderInput: React.FC<SliderInputProps> = ({ id, label, value, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}: <span className="font-bold text-brand-primary">{value}</span>
      </label>
      <input
        id={id}
        type="range"
        value={value}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        {...props}
      />
    </div>
  );
};

export default SliderInput;
