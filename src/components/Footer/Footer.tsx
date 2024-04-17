"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMap,
  faPlus,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer className="bg-emerald-500 py-2 fixed w-full bottom-0">
      <nav>
        <ul className="flex place-content-evenly text-2xl">
          {/* styling not yet working, the whole field should be clickable */}
          <Link href="/profile" className="width-1/3 block">
            <li>
              <FontAwesomeIcon
                icon={faUser}
                className={`${pathName === "/profile" && "text-white"}`}
              />
            </li>
          </Link>
          <li>
            <Link href="/">
              <FontAwesomeIcon
                icon={faMap}
                className={`${pathName === "/" && "text-white"}`}
              />
            </Link>
          </li>
          <li>
            <Link href="/request">
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className={`${pathName === "/request" && "text-white"}`}
              />
              <FontAwesomeIcon
                icon={faPlus}
                className={`${pathName === "/request" && "text-white"}`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
