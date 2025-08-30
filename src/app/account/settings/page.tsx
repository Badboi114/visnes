import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
            <div className="mb-4">
                <Button asChild variant="ghost">
                <Link href="/account">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Link>
                </Button>
            </div>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="space-y-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="new-message-notifications" className="font-normal">
                            New Messages
                            <p className="text-xs text-muted-foreground">Receive a notification when you get a new message.</p>
                        </Label>
                        <Switch id="new-message-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="new-subscriber-notifications" className="font-normal">
                            New Subscribers
                             <p className="text-xs text-muted-foreground">Be notified when a creator you like gets a new subscriber.</p>
                        </Label>
                        <Switch id="new-subscriber-notifications" />
                    </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy</h3>
                 <div className="space-y-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-activity" className="font-normal">
                            Show Activity Status
                             <p className="text-xs text-muted-foreground">Allow others to see when you are online.</p>
                        </Label>
                        <Switch id="show-activity" defaultChecked/>
                    </div>
                </div>
              </div>

               <div className="space-y-4">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="space-y-4">
                   <Button variant="outline">Change Password</Button>
                   <p className="text-xs text-muted-foreground">Last changed 3 months ago.</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
