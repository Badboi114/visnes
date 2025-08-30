import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { genkit } = await import('genkit');
    const { googleAI } = await import('@genkit-ai/googleai');
    const { z } = await import('genkit');

    const RecommendCreatorsBasedOnLikesInputSchema = z.object({
      likedCreatorIds: z.array(z.string()),
      numberOfRecommendations: z.number().default(5),
    });
    const RecommendCreatorsBasedOnLikesOutputSchema = z.object({
      recommendedCreatorIds: z.array(z.string()),
    });

    const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });

    const input = RecommendCreatorsBasedOnLikesInputSchema.parse(req.body);
    const prompt = ai.definePrompt({
      name: 'recommendCreatorsBasedOnLikesPrompt',
      input: { schema: RecommendCreatorsBasedOnLikesInputSchema },
      output: { schema: RecommendCreatorsBasedOnLikesOutputSchema },
      prompt: `You are an expert recommendation system for content creators.\n\nBased on the content creators that a user has liked in the past, recommend other content creators that they might enjoy.\n\nThe user has liked the following creators (creator IDs): {{likedCreatorIds}}\n\nRecommend {{numberOfRecommendations}} creators.\nReturn only the creator IDs in a JSON format.`,
    });
    const { output } = await prompt(input);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
