import { dal } from "@/dal/dal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User info",
  description: "checkout and manage your pins and friends",
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
