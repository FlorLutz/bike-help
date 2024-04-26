"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="bg-emerald-500 text-4xl h-[72px] fixed top-0 left-0 w-full z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex justify-center">
            <Image
              src="/logo.svg"
              height={60}
              width={60}
              alt="logo"
              className="mr-1"
            />
            <p className="font-bold font-serif ml-2 py-3 pr-6">Bike Help</p>
          </Link>
        </div>
        <div className="flex items-center justify-between absolute right-2 top-4">
          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <button onClick={() => setIsNavOpen((prev) => !prev)}>
                <FontAwesomeIcon
                  icon={faBars}
                  className="mr-4"
                ></FontAwesomeIcon>
              </button>
              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                {" "}
                <ul
                  className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-evenly min-h-[200px] text-xl font-bold"
                  onClick={() => setIsNavOpen(false)}
                >
                  <li>
                    <Link href="/help" className="grow">
                      - help -
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">- about -</Link>
                  </li>
                  <li>
                    <Link href="/imprint">- imprint -</Link>
                  </li>
                </ul>
              </div>
            </section>

            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-4 text-xl font-bold">
              <li>
                <Link href="/help">help</Link>
              </li>
              <li>
                <Link href="/about">about</Link>
              </li>
              <li>
                <Link href="/imprint">imprint</Link>
              </li>
            </ul>
          </nav>
          <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 180px;
        height: 200px;
        top: 52px;
        right: 5px;
        background: white;
        border: solid 3px #022c22;
        border-radius: 0.25rem;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>
      </header>
      <div className="pt-[72px]" />
    </>
  );
}
