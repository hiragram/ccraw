import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ccraw',
  description: 'Claude conversation data viewer and analyzer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}