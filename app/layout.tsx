import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import UserNav from "@/components/ui/UserNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animation Web — Banque d'animations",
  description: "Collection d'animations web production-ready. Preview live, code copiable, props configurables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
              <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
                animation<span className="text-accent">.</span>web
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/animations" className="text-sm text-muted hover:text-foreground transition-colors">
                  Animations
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <UserNav />
              </div>
            </nav>
          </header>

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
