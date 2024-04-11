import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lime-200 py-2">
      <nav>
        <ul className="flex place-content-evenly text-2xl">
          {/* styling not yet working, the whole field should be clickable */}
          <Link href="/" className="width-1/3 block">
            <li>
              <i className="fa-solid fa-user"></i>
            </li>
          </Link>
          <li>
            <Link href="/">
              <i className="fa-solid fa-map"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i className="fa-solid fa-plus"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
