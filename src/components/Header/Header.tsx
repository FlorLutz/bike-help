import React from "react";
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <section className="bg-lime-200 flex place-content-between text-2xl py-2">
      <div>
        <i className="fa-solid fa-bicycle mx-4"></i> Bike Help
      </div>
      <div className="flex items-center justify-between">
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="fa-solid fa-bars mr-4"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            ></div>

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
                  <a href="/help">help</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="/about">about</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="/imprint">imprint</a>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-4">
            <li>
              <a href="/help">help</a>
            </li>
            <li>
              <a href="/about">about</a>
            </li>
            <li>
              <a href="/imprint">imprint</a>
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
