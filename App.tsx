
import React, { useState, useCallback } from 'react';
import { generateReplies } from './services/geminiService';
import { Tone } from './types';
import { TONES } from './constants';

import Header from './components/Header';
import TextAreaInput from './components/TextAreaInput';
import SelectInput from './components/SelectInput';
import Button from './components/Button';
import ReplyCard from './components/ReplyCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [mainContext, setMainContext] = useState<string>('');
  const [overallContext, setOverallContext] = useState<string>('');
  const [catalog, setCatalog] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.FRIENDLY);
  const [generatedReplies, setGeneratedReplies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please enter a comment to reply to.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedReplies([]);

    try {
      const replies = await generateReplies(comment, mainContext, overallContext, tone, catalog);
      setGeneratedReplies(replies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [comment, mainContext, overallContext, tone, catalog]);

  return (
    <div className="min-h-screen bg-gray-dark text-gray-text font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-gray-medium shadow-2xl rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextAreaInput
              id="comment"
              label="Comment to Reply To"
              placeholder="e.g., 'Your product is amazing, but I found a small bug...'"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <TextAreaInput
              id="overallContext"
              label="Overall Context (Optional)"
              placeholder="e.g., 'I am a community manager for a gaming company. My goal is to be helpful and build a positive community.'"
              value={overallContext}
              onChange={(e) => setOverallContext(e.target.value)}
              rows={2}
            />
            <TextAreaInput
              id="mainContext"
              label="Main Context (Optional)"
              placeholder="e.g., 'This is a comment on a product launch post. I want to be encouraging but also acknowledge the issue.'"
              value={mainContext}
              onChange={(e) => setMainContext(e.target.value)}
              rows={2}
            />
             <TextAreaInput
              id="catalog"
              label="Product Catalog (Optional, as JSON)"
              placeholder='e.g., [{ "name": "Super Game", "price": 59.99, "description": "An amazing adventure game." }]'
              value={catalog}
              onChange={(e) => setCatalog(e.target.value)}
              rows={4}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                id="tone"
                label="Tone of Reply"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                options={TONES}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <SparklesIcon />
              {isLoading ? 'Generating...' : 'Generate Reply'}
            </Button>
          </form>
        </div>

        <div className="mt-8 md:mt-12">
          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          {!isLoading && generatedReplies.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Generated Reply</h2>
              {generatedReplies.map((reply, index) => (
                <ReplyCard key={index} reply={reply} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
