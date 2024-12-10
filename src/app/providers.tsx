// "use client";
// import { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";

// export default function Providers({
//   children,
//   session,
// }: {
//   children: React.ReactNode;
//   session: Session | null;
// }) {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
