
import React from 'react';

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full bg-gray-light border border-gray-600 rounded-lg p-3 text-gray-text placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-y"
        rows={4}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
