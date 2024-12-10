'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Container } from '@/components/ui/layout/Container';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('email', { email, redirect: false });
    setIsLoading(false);
    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/auth/verify-request');
    }
  };

  return (
    <Container size="sm" className="py-16 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Willkommen zurück</h1>
        <p className="text-muted-foreground">Melden Sie sich an, um Ihre Umfragen zu verwalten</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Anmelden</CardTitle>
          <CardDescription>
            Geben Sie Ihre E-Mail-Adresse ein, um einen Magic Link zu erhalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="ihre.email@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Wir senden Ihnen einen sicheren Link zur Anmeldung.
              </p>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                'Wird gesendet...'
              ) : (
                <>
                  Magic Link senden
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm">
          <div className="text-muted-foreground">
            Durch die Anmeldung stimmen Sie unseren{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Nutzungsbedingungen
            </Link>{' '}
            und{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Datenschutzrichtlinien
            </Link>{' '}
            zu.
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
}
