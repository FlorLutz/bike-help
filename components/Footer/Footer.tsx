import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0">
      <nav>
        <ul className="flex flex-row justify-between">
          <li>
            <Link href="/">
              <i class="fa-solid fa-user"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i class="fa-solid fa-map"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i class="fa-solid fa-plus"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
