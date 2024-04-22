import React from "react";
import { getServerSession } from "next-auth";
import dbConnect from "../../../db/connect";
import Helprequest from "../../../db/models/Helprequest";
import { options } from "../../app/api/auth/[...nextauth]/options";
import LinkButton from "../LinkButton/LinkButton";
import { getMyDateString } from "../../lib/clientActions";

export default async function ProfileHistory() {
  const session: any = await getServerSession(options);
  console.log("PARAMSSESSION in PROFILE", session.user.userId);

  let solvedRequests: any;
  try {
    await dbConnect();
    solvedRequests = await Helprequest.find({
      isOpen: false,
      userId: session.user.userId,
    });
    console.log();
  } catch (error) {
    console.error(error);
  }

  console.log("solvedRequests", solvedRequests);

  return solvedRequests.length === 0 ? (
    <p className="mt-8">You have no solved requests so far.</p>
  ) : (
    <section className="mt-8 mb-4">
      <h2 className="font-bold text-lg mb-4">Your History</h2>
      <section>
        <p>{`You have ${solvedRequests.length} past request(s):`}</p>
        {solvedRequests.map((solvedRequest: any) => (
          <section key={solvedRequest._id} className="my-8">
            <p>{`problem: ${solvedRequest.problem}`}</p>
            <p className="mb-4">{`last modified: ${getMyDateString(
              solvedRequest.date
            )}`}</p>
            <LinkButton
              href={`/request/${solvedRequest._id}`}
              text={`See details here`}
            />
          </section>
        ))}
      </section>
    </section>
  );
}
