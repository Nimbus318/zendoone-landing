import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { OSProvider } from "@/context/OSContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "ZenDoOne - One Thing at a Time",
  description: "A mindful productivity app for macOS.",
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
      </body>
    </html>
  );
}