import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-lime-200 py-2">
      <nav>
        <ul className="flex place-content-evenly text-2xl">
          {/* styling not yet working, the whole field should be clickable */}
          <Link href="/" className="width-1/3 block">
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
          </Link>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faMap} />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}