import Header from '@/components/header';
import { conversations, creators } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

export default function MessagesPage() {
  // For demo purposes, we assume the user has ID '0' (the viewer)
  const currentUserId = '0'; 

  const userConversations = conversations.filter(c => c.participants.includes(currentUserId));

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="outline">
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userConversations.length > 0 ? (
                  userConversations.map(convo => {
                    const otherParticipantId = convo.participants.find(p => p !== currentUserId);
                    const creator = creators.find(c => c.id === otherParticipantId);
                    const lastMessage = convo.messages[convo.messages.length - 1];

                    if (!creator) return null;

                    return (
                      <Link key={convo.id} href={`/messages/${creator.id}`} passHref>
                        <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={creator.profilePicture} alt={creator.name} />
                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold">{creator.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {lastMessage.senderId === currentUserId ? 'You: ' : ''}{lastMessage.text}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You have no messages yet.</p>
                    <Button asChild className="mt-4">
                      <Link href="/discover">Start discovering creators</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
