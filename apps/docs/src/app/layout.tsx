import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Providers } from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tiptide | Modular Rich Text Editor',
  description: 'A clean, modular compound rich text editor built on Tiptap.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html
        lang="en"
        className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="font-inter flex min-h-full flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
