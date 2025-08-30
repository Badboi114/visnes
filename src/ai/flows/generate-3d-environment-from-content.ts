

/**
 * @fileOverview Generates a 3D environment based on a content creator's media.
 *
 * - generate3DEnvironmentFromContent - A function that generates a 3D environment data URI from the creator's content.
 * - Generate3DEnvironmentFromContentInput - The input type for the generate3DEnvironmentFromContent function.
 * - Generate3DEnvironmentFromContentOutput - The return type for the generate3DEnvironmentFromContent function.
 */

// import { getAI } from '@/ai/genkit';
// import { z } from "genkit";

export type Generate3DEnvironmentFromContentInput = {
  contentCreatorName: string;
  contentDescription: string;
  representativeImageDataUri: string;
};

export type Generate3DEnvironmentFromContentOutput = {
  environmentDataUri: string;
  description: string;
};

export async function generate3DEnvironmentFromContent(
  input: Generate3DEnvironmentFromContentInput
): Promise<Generate3DEnvironmentFromContentOutput> {
  const res = await fetch('/api/generate-3d-environment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error('Failed to generate 3D environment');
  }
  return res.json();
}


// La lógica de IA ahora está en /api/generate-3d-environment
