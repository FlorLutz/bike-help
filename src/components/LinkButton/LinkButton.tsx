import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="shadow-md shadow-emerald-600 border-2 border-emerald-950 py-2 px-4 rounded-full bg-emerald-500 font-semibold text-center"
    >
      {text}
    </Link>
  );
}
