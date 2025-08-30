import Image from 'next/image';
import type { Creator } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Box, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  creator: Creator;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export default function ProfileHeader({ creator }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-primary">
        <Image
          src={creator.profilePicture}
          alt={creator.name}
          fill
          className="object-cover"
          data-ai-hint="portrait"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold font-headline">{creator.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{creator.bio}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          {creator.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center md:justify-start gap-6 mt-6">
          <div>
            <p className="text-2xl font-bold font-headline">{formatNumber(creator.posts)}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-headline">{formatNumber(creator.subscribers)}</p>
            <p className="text-sm text-muted-foreground">Subscribers</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
          <Button size="lg">
            <UserPlus className="mr-2" /> Subscribe
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/messages/${creator.id}`}>
              <MessageCircle className="mr-2" /> Message
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link href={`/profile/${creator.id}/space`}>
               <Box className="mr-2" /> Enter 3D Space
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
