import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function Helppage() {
  return (
    <main className="my-8 flex flex-col items-center gap-4 text-lg max-w-[400px] text-center mx-auto">
      <h1 className="font-bold text-2xl mb-6 font-serif">Imprint</h1>
      <p>Florian Lutz © 2024</p>
      <Image
        className="rounded-full"
        src="/florian-lutz.jpg"
        width={200}
        height={200}
        alt="foto of Florian Lutz"
      />
      <p>
        GitHub <br />
        <Link href="https://github.com/FlorLutz" className="font-bold">
          <FontAwesomeIcon icon={faGithub} /> FlorLutz
        </Link>
      </p>
      <p>
        LinkedIn
        <br />
        <Link href="https://github.com/FlorLutz" className="font-bold">
          <FontAwesomeIcon icon={faLinkedin} /> f-lutz
        </Link>
      </p>
    </main>
  );
}
