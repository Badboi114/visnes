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

    const AiSimilaritySearchInputSchema = z.object({
      creatorDescription: z.string(),
      userTaste: z.string(),
      numberOfCreators: z.number(),
    });
    const AiSimilaritySearchOutputSchema = z.object({
      similarCreators: z.array(z.string()),
    });

    const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });

    const input = AiSimilaritySearchInputSchema.parse(req.body);
    const prompt = ai.definePrompt({
      name: 'aiSimilaritySearchPrompt',
      input: { schema: AiSimilaritySearchInputSchema },
      output: { schema: AiSimilaritySearchOutputSchema },
      prompt: `You are an AI assistant that finds similar content creators based on a given content creator description and user taste.\n\nGiven the following content creator description: {{{creatorDescription}}}\nAnd the following user taste: {{{userTaste}}}\n\nPlease find the top {{{numberOfCreators}}} similar content creators. Return the results as a list of creator names.\n\nFormat your response as a JSON object conforming to the following schema: { similarCreators: string[] }`,
    });
    const { output } = await prompt(input);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
