"use client";

import {
  UserCircle,
  ArrowLeftSquareIcon,
  ArrowRightSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNav } from "./navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import React from "react";

export function SiteHeader() {
  const { data: session } = useSession();
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = React.useState("top");

  return (
    <header className=" bg-gradient-to-r from-[#dafd2b] to-[#f3a5ed] sticky top-0 z-40 w-full border-b">
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
                  <DropdownMenuRadioGroup
                    value="position"
                    onValueChange={setPosition}
                    className="gap-4 pl-2"
                  >
                    <DropdownMenuRadioItem value="top" onClick={() => signIn()}>
                      <ArrowRightSquareIcon /> {"Login"}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
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
                <DropdownMenuContent className="w-54">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value="position"
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem
                      value="top"
                      onClick={() => signOut()}
                      className="gap-4 pl-2"
                    >
                      <ArrowLeftSquareIcon /> {"Logout"}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
