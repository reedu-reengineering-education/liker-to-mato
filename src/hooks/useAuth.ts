import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Warte auf Session-Check

    if (!session) {
      // Benutzer ist nicht eingeloggt, leite zur Login-Seite weiter
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  return { session, status };
}
