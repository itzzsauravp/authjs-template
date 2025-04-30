"use server";

import { comparePW } from "@/lib/utils";
import { signIn, signOut } from "../../auth";
import { prisma } from "../../prisma";
import { signIn as passkeySignIn } from "next-auth/webauthn";

export const AuthJsSignInServer = async (formData: FormData) => {
  const providersName = formData.get("provider") as string;
  await signIn(providersName);
};

export const AuthJsSignOut = async () => {
  await signOut();
};

export const AuthJsSignInClient = async (providersName: string) => {
  await signIn(providersName);
};

export const CredentialsSignIn = async ({
  email,
  password,
  redirect,
}: {
  email: string;
  password: string;
  redirect: boolean;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });
  if (user) {
    if (user && !user.password) {
      return { error: true, message: "You Probably logged in with OAuth" };
    }
    if (!(await comparePW(password as string, user.password as string)))
      return { error: true, message: "Invalid Credentials" };

    console.log({ email, password, redirect });
  }
  await signIn("credentials", { email, password, redirect });
};

export const ResendSignInAction = async (formData: FormData) => {
  await signIn("resend", formData);
};

export const PasskeyRegister = async () => {
  await passkeySignIn("passkey", { action: "register" });
};

export const PassKeySignIn = async () => {
  await passkeySignIn("passkey");
};
