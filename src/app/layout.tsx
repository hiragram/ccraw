import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JSONL Viewer',
  description: 'JSONLファイルを綺麗に表示するツール',
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