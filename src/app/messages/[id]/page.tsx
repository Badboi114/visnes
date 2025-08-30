'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Header from '@/components/header';
import { conversations, creators, type Creator, type Message } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function ConversationPage() {
  const params = useParams() ?? {};
  const creatorId = (params as Record<string, string>).id;
  
  // For demo, assume current user is '0'
  const currentUserId = '0';

  const creator = creators.find((c) => c.id === creatorId);
  const conversation = conversations.find(
    (c) => c.participants.includes(creatorId) && c.participants.includes(currentUserId)
  );
  
  const [messages, setMessages] = useState<Message[]>(conversation?.messages || []);
  const [newMessage, setNewMessage] = useState('');

  if (!creator) {
    notFound();
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };


  return (
    <div className="flex flex-col h-screen bg-secondary">
      <Header />
      <div className="flex-grow flex flex-col container mx-auto p-0 md:p-4">
        <div className="flex-grow flex bg-card border rounded-t-xl overflow-hidden">
          <div className="flex flex-col w-full">

            {/* Chat Header */}
            <div className="flex items-center p-3 border-b">
              <Button asChild variant="ghost" size="icon" className="mr-2">
                <Link href="/messages">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={creator.profilePicture} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h2 className="font-semibold text-lg">{creator.name}</h2>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-end gap-2',
                    msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.senderId !== currentUserId && (
                    <Avatar className="h-8 w-8">
                       <AvatarImage src={creator.profilePicture} alt={creator.name} />
                       <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2',
                      msg.senderId === currentUserId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage((e.target as HTMLInputElement).value)}
                  placeholder="Type a message..."
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
