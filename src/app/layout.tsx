import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Quiet Code Soul",
  description: "A mindful approach to coding and development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-950 dark:to-stone-900 transition-all duration-700">
            <Navigation />
            {children}
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}
