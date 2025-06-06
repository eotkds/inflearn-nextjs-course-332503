import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "./_component/MSWcomponent";
import AuthSession from "./_component/authSession";



if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_MSW_ENABLED !== 'false') {
  const { server } = require('@/mocks/http')
  server.listen()
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D. 무슨일이 일어나고 있나요? / D",
  description: "d.com inspired by X.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MSWProvider>
          <AuthSession>{children}</AuthSession>
        </MSWProvider>
      </body>
    </html>
  );
}
