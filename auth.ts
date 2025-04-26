// Think of this as a config file for your Auth.js ( NextAuth v(5) )
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { comparePW, pwHash } from "@/lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
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
        user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          console.log(
            "============== No such user exits..... ================="
          );
          console.log(
            "============== Creating a new account..... ================="
          );
          user = await prisma.user.create({
            data: {
              email: credentials.email as string,
              password: await pwHash(credentials.password as string),
            },
          });
          return user;
        }

        if (!user.password) {
          return null;
        }

        if (!user || !user.password || !user.email) {
          return null;
        }

        if (!(await comparePW(credentials.password as string, user.password)))
          return null;

        return user;
      },
    }),
  ],
});
