import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sesar's creative space",
  description: "Blog, projects, and creative works will be available on this page soon",
  icons: "books.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
