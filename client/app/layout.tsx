'use client';
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Josefin_Sans } from 'next/font/google';
import { Merriweather } from 'next/font/google';

import { ThemeProvider } from './utils/theme-provider';
import './globals.css';
import { Providers } from './Provider';
import { FC, ReactNode } from 'react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';

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
                    <SessionProvider>
                        <ThemeProvider attribute="class" defaultTheme="light">
                            <Custom>{children}</Custom>
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                        </ThemeProvider>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}

const Custom: FC<{ children: ReactNode }> = ({ children }) => {
    const { isLoading } = useLoadUserQuery({});
    return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
