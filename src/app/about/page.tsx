import React from "react";
import Link from "next/link";

export default function Aboutpage() {
  return (
    <main className="my-8 flex flex-col items-center gap-4 text-lg max-w-[400px] text-center mx-auto">
      <h1 className="font-bold text-2xl mb-6 font-serif">About Bike Help</h1>
      <p>
        This App was developed by Florian Lutz as a final project for his
        Full-Stack WebDev Training at{" "}
        <Link href="https://www.spiced-academy.com/" className="font-bold">
          Spiced Academy
        </Link>
        .
      </p>
      <p>
        The approach is to create a mobile first app, that works well in
        portrait mode. Some of the technologies used were: NextJS AppRputer,
        React, Typescript, Tailwind, MapBox and MongoDB with mongoose.
      </p>
      <p>
        As for now, there are no intentions for offering this app for users.
        Feel free to get in touch with me. Any feedback is gladly welcome.
        Contact details can be found in the{" "}
        <Link className="font-bold" href="/imprint">
          imprint
        </Link>
        .
      </p>
      <strong className="mb-2">Enjoy using Bike Help!</strong>
    </main>
  );
}
