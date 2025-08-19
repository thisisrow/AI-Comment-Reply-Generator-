
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-8 border-b border-gray-light">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-teal-400">
        AI Comment Reply Generator
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
        Craft the perfect response. Instantly generate contextual, tone-aware replies for any comment.
      </p>
    </header>
  );
};

export default Header;
