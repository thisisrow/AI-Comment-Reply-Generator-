
import React, { useState, useCallback } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ReplyCardProps {
  reply: string;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [reply]);

  return (
    <div className="bg-gray-medium p-4 rounded-lg shadow-lg border border-gray-light transition-all duration-300 hover:border-brand-primary hover:shadow-brand-primary/20">
      <div className="flex justify-between items-start gap-4">
        <p className="text-gray-300 flex-grow">{reply}</p>
        <button
          onClick={handleCopy}
          className={`p-2 rounded-md transition-colors duration-200 ${
            copied ? 'bg-green-600 text-white' : 'bg-gray-light hover:bg-brand-primary text-gray-400 hover:text-white'
          }`}
          aria-label="Copy reply"
        >
          {copied ? 'Copied!' : <ClipboardIcon />}
        </button>
      </div>
    </div>
  );
};

export default ReplyCard;
