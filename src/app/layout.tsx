import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import StoreProvider from "./StoreProvider";

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
          <Link href="/log-in"  >Login</Link>
          <Link href="/create-user"  >Create user</Link>
        </nav>

        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
