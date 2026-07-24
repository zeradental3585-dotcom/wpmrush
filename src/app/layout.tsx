import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WPM Rush – Free Online Typing Speed Test",
  description:
    "Test your typing speed for free with WPM Rush. Track your words per minute (WPM) and accuracy in real time with a fast, clean typing speed test.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
