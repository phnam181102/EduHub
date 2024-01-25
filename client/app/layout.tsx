'use client';
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { Merriweather } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Provider';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-Poppins',
});

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-Josefin',
});

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['700', '900'],
    variable: '--font-Merriweather',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${josefin.variable} ${merriweather.variable} !bg-white bg-no-repeat`}
            >
                <Providers>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        {children}
                        <Toaster position="top-center" reverseOrder={false} />
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    );
}
