import { creators } from '@/lib/data';
import Header from '@/components/header';
import ProfileHeader from '@/components/profile/profile-header';
import ContentGrid from '@/components/profile/content-grid';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import type { Metadata, ResolvingMetadata } from 'next';

export default async function ProfilePage({ params }: any): Promise<JSX.Element> {
  const creator = creators.find((c) => c.id === params.id);

  if (!creator) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/discover">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Discovery
            </Link>
          </Button>
        </div>
        <ProfileHeader creator={creator} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Content</h2>
          <ContentGrid creator={creator} />
        </div>
      </main>
    </div>
  );
}
