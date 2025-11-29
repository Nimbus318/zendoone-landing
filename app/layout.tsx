import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { OSProvider } from "@/context/OSContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "ZenDoOne - In. Out. Done.",
  description: "In. Out. Done. A mindful productivity app for macOS.",
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
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