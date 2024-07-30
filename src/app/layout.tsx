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
      <body className="min-h-[100vh] w-screen">


        <nav className="flex flex-row h-[fill-content] gap-[30px] bg-[#1064e5]">
          <Link className="py-[10px] px-[10px] text-[white] text-[20px]" href="/"  >Main</Link>
          <Link className="py-[10px] px-[10px] text-[white] text-[20px]" href="/users"  >Users</Link>
          <Link className="py-[10px] px-[10px] text-[white] text-[20px]" href="/log-in"  >Login</Link>
          <Link className="py-[10px] px-[10px] text-[white] text-[20px]" href="/create-user"  >Create user</Link>
          <Link className="py-[10px] px-[10px] text-[white] text-[20px]" href="/users/my-page"  >My profile</Link>

        </nav>

        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
