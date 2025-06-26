import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ccraw - Claude Code Raw Chat Archive Viewer',
  description: 'Web-based viewer for Claude Code raw chat archives in JSONL format',
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