import { Inter } from 'next/font/google';
import './globals.css';
import ApolloProvider from '@/lib/graphql/ApolloProvider';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Foodie: Admin Page',
  description: 'Admin Page for Foodie App',
};
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
