'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '../LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Speichere die ursprüngliche URL für Redirect nach Login
  useEffect(() => {
    if (!session && requireAuth) {
      sessionStorage.setItem('returnUrl', pathname || '/');
    }
  }, [session, pathname, requireAuth]);

  useEffect(() => {
    // Warte auf Session-Check
    if (status === 'loading') return;

    if (!session && requireAuth) {
      toast({
        title: 'Zugriff verweigert',
        description: 'Bitte melden Sie sich an, um auf diesen Bereich zuzugreifen.',
        variant: 'destructive',
      });
      router.push(`/auth/signin?returnUrl=${encodeURIComponent(pathname || '/')}`);
      return;
    }

    setIsAuthorized(true);
  }, [session, status, requireAuth, router, pathname]);

  // Zeige Ladeanimation während der Autorisierungsprüfung
  if (status === 'loading' || !isAuthorized) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
