"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComments,
  faMap,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer className="bg-emerald-500 fixed w-full bottom-0 py-4 h-20px">
      <nav>
        <ul className="flex place-content-evenly text-4xl">
          {/* styling not yet working, the whole field should be clickable */}
          <li>
            <Link href="/profile">
              <FontAwesomeIcon
                icon={faUser}
                className={`${pathName === "/profile" && "text-white"}`}
              />
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <FontAwesomeIcon
                icon={faComments}
                className={`${pathName === "/chat" && "text-white"}`}
              />
            </Link>
          </li>
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
                className={`${pathName.includes("/request") && "text-white"}`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
