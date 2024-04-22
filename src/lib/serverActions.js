"use server";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";
// import { options } from "../app/api/auth/[...nextauth]/options";

export async function redirectServer(url) {
  redirect(url);
}

// export async function getSignedInUserId() {
//   const session = await getServerSession(options);
//   const userId = session?.user.userId;
//   return userId;
// }
