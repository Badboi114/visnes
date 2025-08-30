'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { creators, type Creator } from '@/lib/data';
import { generate3DEnvironmentFromContent, type Generate3DEnvironmentFromContentOutput } from '@/ai/flows/generate-3d-environment-from-content';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreatorSpacePage() {
  const params = useParams() ?? {};
  const creatorId = (params as Record<string, string>).id;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [environment, setEnvironment] = useState<Generate3DEnvironmentFromContentOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const foundCreator = creators.find((c) => c.id === creatorId);
    if (foundCreator) {
      setCreator(foundCreator);
    } else {
      notFound();
    }
  }, [creatorId]);

  useEffect(() => {
    if (creator) {
      const generateEnvironment = async () => {
        setLoading(true);
        setError(null);
        try {
          // A real app would convert the profile picture URL to a data URI
          // For this demo, we can't fetch remote URLs, so we'll pass a placeholder.
          // In a real scenario, you'd fetch the image, convert to base64, and create a data URI.
          const placeholderDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

          const result = await generate3DEnvironmentFromContent({
            contentCreatorName: creator.name,
            contentDescription: creator.bio,
            representativeImageDataUri: placeholderDataUri,
          });
          setEnvironment(result);
        } catch (e) {
          console.error(e);
          setError('Failed to generate the 3D environment. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      generateEnvironment();
    }
  }, [creator]);

  if (!creator) {
    return null; // Or a loading state
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href={`/profile/${creator.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h1 className="text-2xl font-bold">Generating 3D Space...</h1>
              <p className="text-muted-foreground">AI is creating a unique world for {creator.name}.</p>
            </div>
          )}

          {error && (
             <Card className="w-full max-w-lg bg-destructive/10 border-destructive">
              <CardHeader>
                <CardTitle>Generation Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && environment && (
            <div className="w-full max-w-4xl">
              <h1 className="text-4xl font-bold font-headline text-center mb-2">Welcome to {creator.name}&apos;s World</h1>
              <p className="text-lg text-muted-foreground text-center mb-8">{environment.description}</p>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={environment.environmentDataUri}
                      alt={`3D space for ${creator.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="text-center mt-4">
                 <p className="text-sm text-muted-foreground">
                    This is an AI-generated conceptual image of the 3D space.
                 </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
