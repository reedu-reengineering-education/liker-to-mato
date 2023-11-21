"use client";
import Link from "next/link";
import {
  Ghost,
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
} from "@/components/ui/dropdown-menu";
import React from "react";

export function SiteHeader() {
  const { data: session } = useSession();
  const [position, setPosition] = React.useState("top");

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
                  >
                    <div className="flex">
                      <ArrowRightSquareIcon />
                      <DropdownMenuRadioItem
                        value="top"
                        onClick={() => signIn()}
                      >
                        {"Login"}
                      </DropdownMenuRadioItem>
                    </div>
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
                    <div className="flex">
                      <ArrowLeftSquareIcon />
                      <DropdownMenuRadioItem
                        value="top"
                        onClick={() => signOut()}
                      >
                        {"Logout"}
                      </DropdownMenuRadioItem>
                    </div>
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
