import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Ecommerce | %s",
    default: "ecommerce",
  },
  description: "We make your wallet cry",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto min-h-dvh min-w-[300px] max-w-7xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
