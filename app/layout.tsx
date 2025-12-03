import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { OSProvider } from "@/context/OSContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "ZenDoOne - In. Out. Done.",
  description: "Minimal macOS menu bar app that helps you focus on one thing, then gets out of your way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} antialiased overflow-hidden`}>
        <OSProvider>
          {children}
        </OSProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}