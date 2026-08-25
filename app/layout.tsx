import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './styles/chapter-zero-one/base.css';
import './styles/chapter-zero-one/mission.css';
import './styles/chapter-zero-one/animations.css';
import './styles/chapter-zero-one/final-scenes.css';
import './styles/chapter-zero-one/responsive.css';
import './styles/chapter-zero-two/base.css';
import './styles/chapter-zero-two/scenes.css';
import './styles/chapter-zero-two/animations.css';
import './styles/chapter-zero-two/responsive.css';
import './styles/chapter-zero-zero/base.css';
import './styles/chapter-zero-zero/animations.css';
import './styles/chapter-zero-zero/responsive.css';
import './styles/shared/actions.css';
import './styles/shared/agent-motion.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Project: Proof',
  description:
    'Use mathematical tools to transform a serene geometric world. Begin Project: Proof with Chapter 0: Sets & Logic.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Project: Proof',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f5f1e9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
