import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to good-deeds app",
  description: "Manage your positive deeds and achive some carma and pleasure of yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body /* className={inter.className}*/>
        <nav>
          <Link href="/"  >Main</Link>
          <Link href="/users"  >Users</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
