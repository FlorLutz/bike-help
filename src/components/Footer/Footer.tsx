"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMap,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  return (
    <>
      <div className="pt-[72px]" />
      <footer className="shadow-[0_-4px_6px_1px] shadow-emerald-600 bg-emerald-500 fixed w-full bottom-0 py-4 h-[72px] z-10">
        <nav>
          <ul className="flex place-content-evenly text-4xl">
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
                  className={`${pathName.includes("/request") && "text-white"}`}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
