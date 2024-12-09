import { SiteHeader } from "@/components/ui/site-header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/ui/footer";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/3d/Logo3D"), {
  ssr: false,
  loading: () => null
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Likert-to-Mat",
  description: "Ihre Umfrage-Plattform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 font-sans antialiased",
          inter.className
        )}
      >
        <Providers>
          {/* Logo3D außerhalb des Providers, da es client-only ist */}
          <Logo3D />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1 container mx-auto max-w-4xl p-8">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
