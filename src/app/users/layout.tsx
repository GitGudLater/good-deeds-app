import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "checkout users",
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
