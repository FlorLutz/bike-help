import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../db/mongodb";
import type { Adapter } from "next-auth/adapters";

export const options: NextAuthOptions = {
  // export const options = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        // console.log("PROFILE!!!", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session, user }: any) {
      session.user.userId = user.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log(baseUrl, "baseUrl", url, "url");
      url = "/profile";
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return url;
    },
  },
};

// general e-mail setup: 18:00
// https://www.youtube.com/watch?v=w2h54xz6Ndw
// pages: {
//     signIn 10:00
// }
