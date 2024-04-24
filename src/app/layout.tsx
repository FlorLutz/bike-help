import type { Metadata } from "next";
import AuthProvider from "./context/AuthProvider";
import "./globals.css";
import React from "react";
import Layout from "@/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Bike Help",
  description: "give each other a hand with your daily bike struggles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode | any;
}>) {
  return (
    <html lang="en">
      <body className="text-emerald-950 bg-emerald-200">
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
