

/**
 * @fileOverview A flow for finding similar content creators based on AI-powered similarity matches and user taste.
 *
 * - aiSimilaritySearch - A function that handles the content creator similarity search process.
 * - AiSimilaritySearchInput - The input type for the aiSimilaritySearch function.
 * - AiSimilaritySearchOutput - The return type for the aiSimilaritySearch function.
 */

// import {ai} from '@/ai/genkit';
// import {z} from 'genkit';

export type AiSimilaritySearchInput = {
  creatorDescription: string;
  userTaste: string;
  numberOfCreators: number;
};

export type AiSimilaritySearchOutput = {
  similarCreators: string[];
};

export async function aiSimilaritySearch(input: AiSimilaritySearchInput): Promise<AiSimilaritySearchOutput> {
  const res = await fetch('/api/ai-similarity-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error('Failed to perform similarity search');
  }
  return res.json();
}

// La lógica de IA ahora está en /api/ai-similarity-search
