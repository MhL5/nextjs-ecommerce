import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from "@/lib/env";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // temp solution:
  // have to be hard coded because of this error:
  // metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  metadataBase: new URL(env.DOMAIN),
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
