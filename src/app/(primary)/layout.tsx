import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompareProvider } from "@/contexts/CompareContext";
import { ProductProvider } from "@/contexts/ProductContext";

export const metadata: Metadata = {
  title: "Koshak - Premium Indo-Western Clothing",
  description: "Discover exquisite Indo-Western clothing at Koshak. Premium kurtas, lehengas, sarees, and fusion wear with traditional Indian craftsmanship.",
  keywords: "Indo-Western clothing, Indian fashion, kurtas, lehengas, sarees, traditional wear, ethnic fashion",
  authors: [{ name: "Koshak Fashion" }],
  openGraph: {
    title: "Koshak - Premium Indo-Western Clothing",
    description: "Discover exquisite Indo-Western clothing with traditional Indian craftsmanship",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProductProvider>
          <CompareProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CompareProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
