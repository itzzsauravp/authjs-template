"use server";

import { signIn, signOut } from "../../auth";
import { prisma } from "../../prisma";

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

export const CredentialsSignIn = async (formData: FormData) => {
  const email = formData.get("email");
  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });
  if (!user)
    return { error: true, message: "Account doesnot exist, Create a new one." };
  console.log(formData);
  await signIn("credentials", formData);
};
