import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sapna Pradhan | Ultra-Premium AI-Powered Developer Portfolio',
  description: 'Awwwards-level Futuristic AI OS Portfolio for Sapna Pradhan - Full Stack Developer & AI Engineer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
