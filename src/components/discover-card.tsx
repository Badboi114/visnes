'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { Creator } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

interface DiscoverCardProps {
  creator: Creator;
  index: number;
  total: number;
  onAction: (action: 'like' | 'dislike') => void;
}

export default function DiscoverCard({ creator, index, total, onAction }: DiscoverCardProps) {
  const isTopCard = index === total - 1;
  const [isLeaving, setIsLeaving] = useState<'left' | 'right' | null>(null);

  const rotation = (index - (total - 1) / 2) * 5;
  const scale = 1 - (total - 1 - index) * 0.05;
  const translateY = (total - 1 - index) * 10;

  const handleActionClick = (action: 'like' | 'dislike') => {
    setIsLeaving(action === 'like' ? 'right' : 'left');
    setTimeout(() => {
      onAction(action);
    }, 300); // Match animation duration
  };

  return (
    <div
      className={cn(
        'absolute w-[300px] h-[450px] origin-bottom transition-all duration-300 ease-in-out rounded-xl overflow-hidden shadow-lg border-2 border-background',
        isTopCard && 'group-hover:cursor-pointer',
        isLeaving === 'left' && '-translate-x-full rotate-[-30deg]',
        isLeaving === 'right' && 'translate-x-full rotate-[30deg]',
      )}
      style={{
        transform: `rotate(${rotation}deg) scale(${scale}) translateY(${translateY}px) translateZ(${index}px)`,
        zIndex: index,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <Image
        src={creator.profilePicture}
        alt={creator.name}
        fill
        className="object-cover z-0 transition-all duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint="portrait woman"
      />
      <div className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300',
        isTopCard ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )} />

      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-4 z-20 text-white transition-opacity duration-300",
        isTopCard ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}>
         <Link href={`/profile/${creator.id}`} passHref>
            <div className="cursor-pointer">
              <h3 className="font-bold text-xl drop-shadow-md">{creator.name}, {creator.age}</h3>
              <p className="text-sm truncate drop-shadow-sm">{creator.bio}</p>
            </div>
         </Link>
      </div>
      
      {isTopCard && (
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        )}>
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 border-destructive text-destructive border-2 hover:bg-destructive/20 backdrop-blur-sm"
            onClick={() => handleActionClick('dislike')}
          >
            <X className="w-8 h-8" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 border-green-500 text-green-500 border-2 hover:bg-green-500/20 backdrop-blur-sm"
            onClick={() => handleActionClick('like')}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      )}
    </div>
  );
}
