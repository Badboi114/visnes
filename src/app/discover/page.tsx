'use client';
import Header from '@/components/header';
import { creators } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function DiscoverPage() {
  const profiles = creators.slice(0, 8); // Using 8 profiles as in the reference image

  // Vertical offsets for the staggered effect, inspired by the reference image
  const offsets = [
    'translate-y-0',
    'translate-y-8',
    'translate-y-2',
    'translate-y-12',
    'translate-y-4',
    'translate-y-9',
    'translate-y-0',
    'translate-y-6',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary text-foreground">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold">Scorts Bolivia</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Disfruta de una experiencia PREMIUM.
          </p>
        </div>

        <div className="relative w-full flex items-center justify-center px-4">
          <div className="flex items-start justify-center gap-4 h-[500px]">
            {profiles.map((creator, index) => (
              <Link key={creator.id} href={`/profile/${creator.id}`} passHref>
                <div
                  className={`relative w-40 h-[400px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer ${
                    offsets[index % offsets.length]
                  }`}
                >
                  <Image
                    src={creator.profilePicture}
                    alt={creator.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint="portrait woman"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
