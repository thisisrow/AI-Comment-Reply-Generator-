import React from 'react';
import { KeyIcon } from './icons/KeyIcon';
import { BookIcon } from './icons/BookIcon';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border-b border-gray-light gap-4">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-teal-400">
          AI Comment Reply Generator
        </h1>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto md:mx-0">
          Craft the perfect response. Instantly generate contextual, tone-aware replies for any comment.
        </p>
      </div>
      <div className="flex-shrink-0 flex gap-3">
        <a 
          href="https://aistudio.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-gray-light hover:bg-gray-600/70 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <KeyIcon />
          Get API Key
        </a>
        <a 
          href="https://ai.google.dev/docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-light hover:bg-gray-600/70 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <BookIcon />
          API Docs
        </a>
      </div>
    </header>
  );
};

export default Header;