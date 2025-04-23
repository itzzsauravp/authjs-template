"use server";

import { signIn, signOut } from "../../auth";

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
