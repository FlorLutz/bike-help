import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lime-200">
      <nav>
        <ul className="flex place-content-evenly text-2xl">
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
