import { Layout } from './_components/Layout';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/styles/global.css';

export const metadata = {
  title: 'Yarare App',
} satisfies Metadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ja'>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
