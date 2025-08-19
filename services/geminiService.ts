
import { GoogleGenAI, Type } from '@google/genai';
import { Tone } from '../types';

export async function generateReplies(
  comment: string,
  mainContext: string,
  overallContext: string,
  tone: Tone,
  catalog: string,
  numReplies: number
): Promise<string[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable not set');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert customer support agent. Your task is to craft ${numReplies} distinct, tone-aware ${numReplies > 1 ? 'replies' : 'reply'} to a public comment.

    **Instructions:**
    1.  Adopt a ${tone} tone.
    2.  Use the 'Main Context' for specific details about this interaction.
    3.  Use the 'Overall Context' for general guidance on your persona and goals.
    4.  If the user's comment involves a product, consult the 'Product Catalog' provided below to get information.
    5.  If a user asks about a product that isn't a good fit or is unavailable, use the catalog to recommend a better-fit alternative if one exists.
    6.  **Crucially, never invent details.** Do not make up product names, features, prices, or availability. If the information isn't in the catalog, state that you don't have that information.
    7.  Each reply must be concise.
    8.  The output must be a valid JSON array containing ${numReplies} string(s).

    **Original Comment:**
    "${comment}"

    ${mainContext ? `**Main Context (Specific to this comment):**\n"${mainContext}"` : ''}
    ${overallContext ? `**Overall Context (General guidance):**\n"${overallContext}"` : ''}
    ${catalog ? `**Product Catalog (for reference):**\n${catalog}` : ''}

    Generate ${numReplies} repl${numReplies > 1 ? 'ies' : 'y'}.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: 'A single reply suggestion.',
          },
        },
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const replies = JSON.parse(jsonText);

    if (!Array.isArray(replies) || !replies.every(item => typeof item === 'string')) {
        throw new Error('API returned data in an unexpected format.');
    }

    return replies;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate replies. The AI model may be temporarily unavailable.');
  }
}
