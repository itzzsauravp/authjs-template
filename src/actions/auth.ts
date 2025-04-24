"use server";

import { signIn, signOut } from "../../auth";
import { prisma } from "../../prisma";

export const oAuthSignInServer = async (formData: FormData) => {
  const providersName = formData.get("provider") as string;
  await signIn(providersName);
};

export const oAuthSignOut = async () => {
  await signOut();
};

export const oAuthSignInClient = async (providersName: string) => {
  console.log("foobar");
  await signIn(providersName);
};

export const CredentialsSignInClient = async (credentails: {
  email: string;
  password: string;
}) => {
  await signIn("credentials", credentails);
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
