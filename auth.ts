// Think of this as a config file for your Auth.js ( NextAuth v(5) )
import NextAuth, { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { encode as defaultEncode } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { comparePW } from "@/lib/utils";
import { randomUUID } from "node:crypto";

const adapter = PrismaAdapter(prisma);

// config
const nextAuthConfig: NextAuthConfig = {
  adapter,
  providers: [
    GitHub,
    Google,
    Discord,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // credentials comes from signIn("credentials", {your_form_data})
      // this function is here to check if the user is valid or not.
      // returns null means login/signup unsuccessful, returns user means successful.
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password || !user.email) return null;

        if (!(await comparePW(credentials.password as string, user.password)))
          return null;

        return user;
      },
    }),
  ],
  // after successful login calls the jwt method, allows to modify the token before saving it.
  callbacks: {
    async jwt({ token, _user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      console.log("This is the token", token);
      return token;
    },
  },
  // after the token is created calls the encode method to save the encode and save the token to db.
  jwt: {
    encode: async function (params) {
      console.log("These are params", params);
      if (params.token?.credentials) {
        const sessionToken = randomUUID();
        if (!params.token?.sub) {
          throw new Error("No User ID found in token");
        }
        const createSession = await adapter.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        if (!createSession) {
          throw new Error("Failed to create session");
        }
        // when using the credentials return the session token
        return sessionToken;
      }
      // when not using the credentials, encode the params and return it.
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
