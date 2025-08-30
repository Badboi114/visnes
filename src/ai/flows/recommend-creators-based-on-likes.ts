

/**
 * @fileOverview Recommends content creators based on user's liked creators.
 *
 * - recommendCreatorsBasedOnLikes - A function that recommends creators.
 * - RecommendCreatorsBasedOnLikesInput - The input type for the recommendCreatorsBasedOnLikes function.
 * - RecommendCreatorsBasedOnLikesOutput - The return type for the recommendCreatorsBasedOnLikes function.
 */

// import {ai} from '@/ai/genkit';
// import {z} from 'genkit';

export type RecommendCreatorsBasedOnLikesInput = {
  likedCreatorIds: string[];
  numberOfRecommendations: number;
};

export type RecommendCreatorsBasedOnLikesOutput = {
  recommendedCreatorIds: string[];
};

export async function recommendCreatorsBasedOnLikes(
  input: RecommendCreatorsBasedOnLikesInput
): Promise<RecommendCreatorsBasedOnLikesOutput> {
  const res = await fetch('/api/recommend-creators-based-on-likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error('Failed to get recommendations');
  }
  return res.json();
}

// La lógica de IA ahora está en /api/recommend-creators-based-on-likes
