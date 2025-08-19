
import React from 'react';

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-gray-light border border-gray-600 rounded-lg p-3 text-gray-text focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
