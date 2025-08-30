'use client';

import { useSearchParams } from 'next/navigation';
import { creators } from '@/lib/data';
import type { Creator } from '@/lib/data';
import Header from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';

function SearchResults() {
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const query = searchParams.get('q') || '';
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const minAge = Number(searchParams.get('minAge') || '18');
  const maxAge = Number(searchParams.get('maxAge') || '50');

  
  const filteredCreators = creators.filter(creator => {
    const matchesQuery = query 
      ? creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.bio.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesTags = tags.length > 0
      ? tags.every(tag => creator.tags.includes(tag))
      : true;
      
    const matchesAge = creator.age >= minAge && creator.age <= maxAge;

    return matchesQuery && matchesTags && matchesAge;
  });

  const hasFilters = query || tags.length > 0 || searchParams.has('minAge');

  const renderTitle = () => {
    if (!hasFilters) return 'Browse all creators';
    
    let parts: React.ReactNode[] = [];
    if(query) parts.push(<>results for &quot;{query}&quot;</>);
    
    let filterParts: string[] = [];
    if(tags.length > 0) filterParts.push(`tags: ${tags.join(', ')}`);
    if(searchParams.has('minAge')) filterParts.push(`age: ${minAge}-${maxAge}`);
    
    if(filterParts.length > 0) {
      parts.push(<> with {filterParts.join(' and ')}</>);
    }

    return <>Search {parts}</>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">
        {renderTitle()}
      </h1>
      
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <Link key={creator.id} href={`/profile/${creator.id}`} passHref>
              <Card className="overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={creator.profilePicture}
                      alt={creator.name}
                      fill
                      className="object-cover"
                      data-ai-hint="portrait"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{creator.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {creator.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No creators found matching your criteria.</p>
           <Button variant="link" asChild>
            <Link href="/search">Clear filters and see all creators</Link>
          </Button>
        </div>
      )}
    </div>
  );
}


export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold font-headline mb-8">Searching...</h1></div>}>
                <SearchResults />
              </Suspense>
            </main>
        </div>
    )
}
