import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Bell, Lock, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <UserCircle className="text-primary h-5 w-5" /> Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="The" className="bg-input/50" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Creator" className="bg-input/50" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="creator@iamotels.com" className="bg-input/50" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Profile</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Bell className="text-accent h-5 w-5" /> Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
            </div>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="systemAlerts">System Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified for critical system events.</p>
            </div>
            <Switch id="systemAlerts" defaultChecked />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Preferences</Button>
        </CardContent>
      </Card>
      
      <Separator />

       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Lock className="text-blue-400 h-5 w-5" /> Security Settings
          </CardTitle>
          <CardDescription>Manage your account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Button variant="outline">Change Password</Button>
            </div>
            <div>
                 <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                 <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground">Enhance your account security.</p>
                    <Switch id="twoFactorAuth" />
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Separator />

       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Palette className="text-purple-400 h-5 w-5" /> Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel (Theme settings are global for now).</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Theme customization options will be available here in the future.</p>
             <div className="mt-4 h-20 bg-muted/30 rounded-md flex items-center justify-center" data-ai-hint="theme color swatches">
              <p className="text-muted-foreground text-sm">Theme Customizer Placeholder</p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
