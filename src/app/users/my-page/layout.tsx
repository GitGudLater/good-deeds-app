import { dal } from "@/dal/dal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Current User info",
  description: "checkout friends and manage pins",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //const user = dal.fetchUserByLogin()
  return (
    <div>
        {children}
    </div>
  );
}
