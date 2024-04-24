import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMap,
  faScrewdriverWrench,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Helppage() {
  return (
    <main className="my-8 flex flex-col items-center gap-4 text-lg max-w-[400px] text-center mx-auto">
      <h1 className="font-bold text-2xl mb-6 font-serif">
        Help for Using Bike Help
      </h1>
      <Image
        className="rounded"
        src="/flat-tire.jpg"
        width={400}
        height={200}
        alt="foto of a flat tire"
      />
      <p>
        These short instructions should help you getting started with the Bike
        Help App.
      </p>
      <p>
        Its basic navigation happens throught the three icons on the footer.
        They navigate you to the following pages:
      </p>
      <ul>
        <li className="mb-2">
          <FontAwesomeIcon icon={faUser} /> - the user profile page with signIn
          option, information about the user and the user&apos;s request history
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faMap} /> - the home page with the big map
          displaying points of interest and user help requests. If you click on
          the markers you will receive more info about the possible repair sites
          (<FontAwesomeIcon icon={faShop} />) or the help requests (
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          ). Latter gives you the option to few more details which include the
          phone number of the person in need, so you can get in touch with them.
        </li>
        <li>
          <FontAwesomeIcon icon={faScrewdriverWrench} /> - the request page that
          let&apos;s you create, edit and delete requests. You can also mark
          them as resolved after getting help.
        </li>
      </ul>
      <p>
        Additionally you can click the logo in the header to navigate to the
        home page or click the burger menu for additional information about the
        app.
      </p>
    </main>
  );
}
