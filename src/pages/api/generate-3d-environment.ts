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

    const Generate3DEnvironmentFromContentInputSchema = z.object({
      contentCreatorName: z.string(),
      contentDescription: z.string(),
      representativeImageDataUri: z.string(),
    });
    const Generate3DEnvironmentFromContentOutputSchema = z.object({
      environmentDataUri: z.string(),
      description: z.string(),
    });

    const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });

    const input = Generate3DEnvironmentFromContentInputSchema.parse(req.body);
    const prompt = ai.definePrompt({
      name: 'generate3DEnvironmentFromContentPrompt',
      input: { schema: Generate3DEnvironmentFromContentInputSchema },
      output: { schema: z.object({ description: z.string() }) },
      prompt: `You are a 3D environment designer. You will generate a rich description for a 3D environment based on the description of a content creator.\n\nThe environment should reflect the style and themes of the content creator's content.\n\nCreator Name: {{{contentCreatorName}}}\nContent Description: {{{contentDescription}}}\n\nGenerate a one-sentence, captivating description of the 3D environment. Do not mention the creator's name.`,
    });
    const { output } = await prompt(input);
    const description = output!.description;
    const imageGenPrompt = `A beautiful, immersive, 3D render of a digital world. The scene is: ${description}. High quality, cinematic, detailed.`;
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: imageGenPrompt,
    });
    if (!media?.url) {
      throw new Error('Image generation failed.');
    }
    res.status(200).json({
      description,
      environmentDataUri: media.url,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
