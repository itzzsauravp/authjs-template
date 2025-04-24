// Think of this as a config file for your Auth.js ( NextAuth v(5) )
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Discord,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const pwHash = credentials.password; // hash later

        user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
            // password: pwHash,
          },
        });
        if (!user) {
          console.log(
            "============== No such user exits..... ================="
          );
        }
        return user;
      },
    }),
  ],
});
