import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

import { SessionProvider } from "next-auth/react";

import HeaderWrapper from "./components/header/HeaderWrapper";
import Footer from "./components/footer/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kino - Lycksele",
  description: "Remake of previous Kino Site!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="root">
        <SessionProvider>
          <HeaderWrapper />
          {children}
          <Footer />
        </SessionProvider>
        
      </body>
    </html>
  );
}
