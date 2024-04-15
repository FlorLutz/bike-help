// import type { NextApiRequest, NextApiResponse } from "next"
// import NextAuth from "next-auth"

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//     ...
//   })
// }

// export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

// custom pages for sginin/sign out etc or use can be set in options

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);
