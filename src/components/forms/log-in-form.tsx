"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateAccount() {
  const [showButton, setShowButton] = useState(true);
  const [showTabs, setShowTabs] = useState(false);

  const handleLoginClick = () => {
    setShowButton(false);
    setTimeout(() => {
      setShowTabs(true);
    }, 300);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div
          className={`login-button-container ${
            showButton
              ? "transition ease-out duration-100 transform opacity-100 scale-100"
              : "transition ease-in duration-75 transform opacity-0 scale-95"
          }`}
        >
          {showButton && (
            <Button onClick={handleLoginClick} id="Login">
              Registrer or login
            </Button>
          )}
        </div>
        {showTabs && (
          <div
            className={`tab-content ${
              showTabs
                ? "transition ease-out duration-100 transform opacity-100 scale-100"
                : "transition ease-in duration-75 transform opacity-0 scale-95"
            }`}
          >
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="mustermann@gmail.com" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="@mustermann" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Make your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="user">Your password</Label>
                      <Input id="user" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="repeat">Repeat your password</Label>
                      <Input id="repeat" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </main>
  );
}

export default CreateAccount;
