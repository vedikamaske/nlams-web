import type { Metadata } from "next";
import {
  Noto_Sans,
  Noto_Sans_Display,
  Noto_Sans_Devanagari,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Primary interface font — Noto Sans (variable font)
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display / large heading font — Noto Sans Display (variable font)
const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-sans-display",
  subsets: ["latin"],
  display: "swap",
});

// Indian script support — Noto Sans Devanagari
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Monospace — kept for code/data display
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SANKALP - Smart Acquisition Network for Knowledge, Administration, Land & Processing",
  description:
    "Smart Acquisition Network for Knowledge, Administration, Land & Processing — a Government of India platform for transparent and efficient land acquisition and management.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSansDisplay.variable} ${notoSansDevanagari.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
