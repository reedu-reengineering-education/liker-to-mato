"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MainNav } from "./navigation";
import { useSession, signIn, signOut } from "next-auth/react";

// const links = [Studenten... ];

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          items={[
            {
              // TODO: add more items
              title: "Studio",
              href: "/studio",
            },
            {
              title: "About",
              href: "/about",
            },
            {
              title: "FAQ",
              href: "/faq",
            },
            {
              title: "Contact",
              href: "/contact",
            },
          ]}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {!session && <Button onClick={() => signIn()}>Login</Button>}
            {session && <Button onClick={() => signOut()}>Logout</Button>}
          </nav>
        </div>
      </div>
    </header>
  );
}
