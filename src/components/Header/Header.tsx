"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <section className="bg-emerald-500 flex place-content-between text-4xl py-4 h-20px">
      <Link href="/" className="flex">
        <FontAwesomeIcon
          icon={faBicycle}
          className="mx-4 mt-[2px]"
        ></FontAwesomeIcon>{" "}
        <p className="font-bold ">Bike Help</p>
      </Link>
      <div className="flex items-center justify-between">
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <FontAwesomeIcon
              icon={faBars}
              className="mr-4"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            ></FontAwesomeIcon>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/help">help</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/about">about</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/imprint">imprint</Link>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-4">
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
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
    </section>
  );
}
