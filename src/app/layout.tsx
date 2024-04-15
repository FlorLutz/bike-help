import type { Metadata } from "next";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Bike Help",
  description: "give each other a hand with your daily bike struggles",
};

export default function RootLayout({
  children,
  params: { session, ...params },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <SessionProvider session={session}>{children}</SessionProvider> */}
      </body>
    </html>
  );
}
