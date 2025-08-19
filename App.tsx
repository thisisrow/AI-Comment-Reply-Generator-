
import React, { useState, useCallback } from 'react';
import { generateReplies } from './services/geminiService';
import { Tone } from './types';
import { TONES } from './constants';

import Header from './components/Header';
import TextAreaInput from './components/TextAreaInput';
import SelectInput from './components/SelectInput';
import SliderInput from './components/SliderInput';
import Button from './components/Button';
import ReplyCard from './components/ReplyCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import ApiReference from './components/ApiReference';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [mainContext, setMainContext] = useState<string>('');
  const [overallContext, setOverallContext] = useState<string>('');
  const [catalog, setCatalog] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.FRIENDLY);
  const [numReplies, setNumReplies] = useState<number>(1);
  const [generatedReplies, setGeneratedReplies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiRequest, setApiRequest] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please enter a comment to reply to.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedReplies([]);
    setApiRequest(null);

    try {
      const replies = await generateReplies(comment, mainContext, overallContext, tone, catalog, numReplies);
      setGeneratedReplies(replies);

      // Create the API request for display
      const prompt = `
    You are an expert customer support agent. Your task is to craft ${numReplies} distinct, tone-aware ${numReplies > 1 ? 'replies' : 'reply'} to a public comment.

    **Instructions:**
    1.  Adopt a ${tone} tone.
    2.  Use the 'Main Context' for specific details about this interaction.
    3.  Use the 'Overall Context' for general guidance on your persona and goals.
    4.  If the user's comment involves a product, consult the 'Product Catalog' provided below to get information.
    5.  If a user asks about a product that isn't a good fit or is unavailable, use the catalog to recommend a better-fit alternative if one exists.
    6.  **Crucially, never invent details.** Do not make up product names, features, prices, or availability. If the information isn't in the catalog, state that you don't have that information.
    7.  The reply must be concise.
    8.  The output must be a valid JSON array containing ${numReplies} string(s).

    **Original Comment:**
    "${comment}"

    ${mainContext ? `**Main Context (Specific to this comment):**\n"${mainContext}"` : ''}
    ${overallContext ? `**Overall Context (General guidance):**\n"${overallContext}"` : ''}
    ${catalog ? `**Product Catalog (for reference):**\n${catalog}` : ''}

    Generate ${numReplies} repl${numReplies > 1 ? 'ies' : 'y'}.
  `;

      const payload = {
        contents: [
          {
            parts: [{ text: prompt.trim() }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'ARRAY',
            items: {
              type: 'STRING',
              description: 'A single reply suggestion.',
            },
          },
          temperature: 0.7,
          topP: 0.95,
        },
      };

      const curlCommand = `curl 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(payload, null, 2)}'`;
      
      setApiRequest(curlCommand);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [comment, mainContext, overallContext, tone, catalog, numReplies]);

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
              <SliderInput
                id="numReplies"
                label="Number of Replies"
                min="1"
                max="5"
                value={numReplies}
                onChange={(e) => setNumReplies(parseInt(e.target.value, 10))}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <SparklesIcon />
              {isLoading ? 'Generating...' : `Generate ${numReplies} Repl${numReplies > 1 ? 'ies' : 'y'}`}
            </Button>
          </form>
        </div>

        <div className="mt-8 md:mt-12">
          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          {!isLoading && generatedReplies.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                Generated Repl{numReplies > 1 ? 'ies' : 'y'}
              </h2>
              {generatedReplies.map((reply, index) => (
                <ReplyCard key={index} reply={reply} />
              ))}
            </div>
          )}
          {!isLoading && apiRequest && (
            <div className="mt-8 md:mt-12">
              <ApiReference command={apiRequest} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
