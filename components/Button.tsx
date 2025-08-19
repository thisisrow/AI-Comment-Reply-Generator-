
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
