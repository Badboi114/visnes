import Header from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function AccountPage() {
  // Demo user data
  const user = {
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://picsum.photos/200/200?random=99',
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-muted-foreground">My Information</h3>
                <div className="space-y-2">
                    <p><strong>Username:</strong> {user.name.toLowerCase().replace(' ', '_')}</p>
                    <p><strong>Joined:</strong> January 2024</p>
                </div>
                <Button className="w-full" asChild>
                    <Link href="/account/edit">Edit Profile</Link>
                </Button>
              </div>
              <Separator className="my-6" />
               <div className="space-y-4">
                <h3 className="text-lg font-medium text-muted-foreground">Subscription</h3>
                <div className="p-4 bg-muted rounded-lg text-center">
                    <p>You are on the <strong>Free Plan</strong>.</p>
                    <Button className="mt-2" variant="outline">Upgrade to Premium</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
