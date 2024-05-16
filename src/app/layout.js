/* eslint-disable camelcase */

import { Analytics } from '@vercel/analytics/react';
import { Poppins, Josefin_Slab } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin-slab',
  weight: ['100', '200', '300', '400', '500', '600', '700']
});

export const metadata = {
  title: 'BM Warehouse',
  description: 'Baby and Mom Warehouse App'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefinSlab.variable}`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
