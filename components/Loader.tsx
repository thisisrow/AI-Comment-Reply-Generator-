
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400">AI is thinking...</p>
    </div>
  );
};

export default Loader;
