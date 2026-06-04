import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "./components/darkLightTheme/ThemeProvider";
import "./globals.scss";

import { SessionProvider } from "next-auth/react";

import HeaderWrapper from "./components/header/HeaderWrapper";
import Footer from "./components/footer/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
    <html
      lang="sv"
      className={`${roboto.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
    >
      <body className="root">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeaderWrapper />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
