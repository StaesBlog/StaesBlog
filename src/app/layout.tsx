import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Noto_Serif, Fira_Code } from 'next/font/google';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});


export const metadata: Metadata = {
  title: 'StaesBlog',
  description: 'A modern blog for minimalist thoughts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={cn('font-body antialiased h-full flex flex-col', notoSerif.variable, firaCode.variable)}>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
