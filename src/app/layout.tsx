import type { Metadata } from "next";
import AuthProvider from "./context/AuthProvider";
import "./globals.css";
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Josefin_Sans, Kaushan_Script } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kaushanscript",
});

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
    <html
      lang="en"
      className={`${josefinSans.className} ${kaushanScript.variable} font sans`}
    >
      <body className="text-emerald-950 bg-emerald-200">
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
