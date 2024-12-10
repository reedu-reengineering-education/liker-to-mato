'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || '');
  const [image, setImage] = useState(session?.user?.image || '');

  if (status === 'loading') {
    return <ProfileSkeleton />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const handleSave = async () => {
    try {
      await update({ name, image });
      setIsEditing(false);
      toast({
        title: 'Profil aktualisiert',
        description: 'Ihre Änderungen wurden erfolgreich gespeichert.',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Beim Speichern Ihrer Änderungen ist ein Fehler aufgetreten.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user.name || ''} />
              <AvatarFallback>{session?.user.name?.[0] || session?.user.email?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{isEditing ? 'Profil bearbeiten' : 'Profil'}</CardTitle>
              <CardDescription>{session?.user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profilbild URL</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleSave}>Speichern</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Bearbeiten</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-[100px]" />
        </CardFooter>
      </Card>
    </div>
  );
}
