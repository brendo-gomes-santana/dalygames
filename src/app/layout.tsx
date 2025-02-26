import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daly Games - Descubra jogos incríveis para se divertir",
  description: "Mais de 10 mil jogos separados e organizado",
  keywords: ["games", "jogos", "steam"],
  openGraph: {
    images: [`${process.env.PROJETO_URL}/preview.png`]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="pt-br">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
