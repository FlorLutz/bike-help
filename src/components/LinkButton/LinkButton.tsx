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
      className="border-4 border-emerald-950 p-2 rounded bg-emerald-500 font-semibold text-center"
    >
      {text}
    </Link>
  );
}
