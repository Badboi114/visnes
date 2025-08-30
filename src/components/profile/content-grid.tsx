import Image from 'next/image';
import type { Creator } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface ContentGridProps {
  creator: Creator;
}

export default function ContentGrid({ creator }: ContentGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {creator.content.map((item) => (
        <Card key={item.id} className="overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Image
                src={item.thumbnail}
                alt={`Content by ${creator.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                data-ai-hint="lifestyle fashion"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {item.type === 'video' && (
                  <PlayCircle className="w-12 h-12 text-white/80" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
