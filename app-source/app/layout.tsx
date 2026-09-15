import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Alice's Adventure Book",
  description: 'A digital National Parks adventure book with Passport regions, stamps, photos, and park badges.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
