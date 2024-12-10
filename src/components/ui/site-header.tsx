'use client';
import Link from 'next/link';
import {
  Ghost,
  UserCircle,
  ArrowLeftSquareIcon,
  ArrowRightSquareIcon,
  FileText,
  Shield,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainNav } from './navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';
import React from 'react';

export function SiteHeader() {
  const { data: session } = useSession();
  const [position, setPosition] = React.useState('top');

  function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <header
      className={cn(
        'relative bg-white dark:bg-gray-900',
        'top-0 z-40 w-full border-b-2 border-indigo-500 dark:border-indigo-400',
        'shadow-sm'
      )}
    >
      <div className="container flex h-16 w-auto items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          items={[
            {
              title: 'Studio',
              href: '/studio',
            },
            {
              title: 'About',
              href: '/about',
            },
            {
              title: 'FAQ',
              href: '/faq',
            },
            {
              title: 'Contact',
              href: '/contact',
            },
            {
              title: 'Dashboard',
              href: '/dashboard',
            },
            {
              title: 'Account',
              href: '/account',
            },
            {
              title: 'Pläne',
              href: '/account/plans',
            },
            {
              title: 'Impressum',
              href: '/imprint',
            },
            {
              title: 'Datenschutz',
              href: '/privacy',
            },
          ]}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {!session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <UserCircle>Account</UserCircle>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => signIn()}>
                      <ArrowRightSquareIcon className="mr-2 h-4 w-4" />
                      Login
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <UserCircle>Account</UserCircle>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50">
                  <DropdownMenuLabel>Mein Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/account">
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profil
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/account/plans">
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pläne & Abonnements
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <ArrowLeftSquareIcon className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
