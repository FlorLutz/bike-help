import React from "react";
import Link from "next/link";

interface ILinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: ILinkButtonProps) {
  return (
    <Link
      href={href}
      className="border-4 border-emerald-950 p-2 rounded bg-emerald-500"
    >
      {text}
    </Link>
  );
}
