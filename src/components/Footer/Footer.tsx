import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMap,
  faPlus,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-lime-200 py-2 fixed w-full bottom-0">
      <nav>
        <ul className="flex place-content-evenly text-2xl">
          {/* styling not yet working, the whole field should be clickable */}
          <Link href="/profile" className="width-1/3 block">
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
            <Link href="/newrequest">
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
