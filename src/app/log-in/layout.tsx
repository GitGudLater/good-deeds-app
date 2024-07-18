import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogIn",
  description: "LogIn with your password and login",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
        {children}
    </div>
  );
}