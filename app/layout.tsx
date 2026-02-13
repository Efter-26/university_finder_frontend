import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBanner from '@/components/PromoBanner';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Shabuj Global Education | Worldwide University Admission',
    template: '%s | Shabuj Global Education',
  },
  description:
    'British Council-approved consultancy helping students achieve their study abroad dreams. Undergraduate, postgraduate, foundation and advanced degrees in UK, USA, Canada, Australia and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <Header />
        <PromoBanner />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
