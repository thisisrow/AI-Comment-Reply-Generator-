import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ApiReferenceProps {
  command: string;
}

const ApiReference: React.FC<ApiReferenceProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <div className="bg-gray-medium shadow-2xl rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-4">For Developers: API Request</h3>
      <div className="relative bg-gray-dark p-4 rounded-lg border border-gray-light font-mono text-sm text-gray-300">
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-2 rounded-md transition-colors duration-200 ${
            copied ? 'bg-green-600 text-white' : 'bg-gray-light hover:bg-brand-primary text-gray-400 hover:text-white'
          }`}
          aria-label="Copy cURL command"
        >
          {copied ? 'Copied!' : <ClipboardIcon />}
        </button>
        <pre className="whitespace-pre-wrap break-all">
          <code>{command}</code>
        </pre>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Note: Replace <code>YOUR_API_KEY</code> with your actual Google AI API key. This example can be run directly in your terminal or imported into tools like Postman.
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Don't have a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-semibold hover:underline">Get one from Google AI Studio</a>.
      </p>
    </div>
  );
};

export default ApiReference;