import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sesar's",
  description: "A simple web portfolio",
  icons: "books.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="sesar.my.id" src="https://plausible.sesar.my.id/js/script.js"></script>
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
