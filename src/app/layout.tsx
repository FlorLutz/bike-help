import type { Metadata } from "next";
import AuthProvider from "./context/AuthProvider";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Bike Help",
  description: "give each other a hand with your daily bike struggles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-emerald-950 bg-emerald-200">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
