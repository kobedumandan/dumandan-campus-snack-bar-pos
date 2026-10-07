import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import AppShell from "./_components/AppShell";
import { PosProvider } from "./_lib/pos-context";
import { findProductImages } from "./_lib/product-images";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Used only on the printed-style receipt.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Snack Bar POS",
  description: "Point-of-sale counter for the campus snack bar: take orders, accept cash, and issue receipts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <PosProvider images={findProductImages()}>
          <AppShell>{children}</AppShell>
        </PosProvider>
      </body>
    </html>
  );
}
