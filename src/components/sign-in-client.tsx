"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithLabel } from "@/components/ui/input";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import OAuthSignInButton from "./authjs-sign-up-button";
import { useState } from "react";
import { CredentialsSignIn } from "@/actions/auth";

export default function SignUpComponentClient() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const clientSignInAction = async (formData: FormData) => {
    // add validation here later.
    const result = await CredentialsSignIn(formData);
    if (result?.error) {
      setError(result.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl">
          NextJs-AuthJs-Boiler-Plate (client)
        </CardTitle>
      </CardHeader>
      {error && (
        <h1 className=" text-center text-sm text-red-500 font-semibold">
          {error}
        </h1>
      )}
      <CardContent>
        <form action={clientSignInAction} className="space-y-4">
          <InputWithLabel
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputWithLabel
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
      <div className="flex items-center gap-2 w-[80%] my-3 mx-auto">
        <div className="w-1/2 bg-gray-500 h-[1px]"></div>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          Other Providers
        </span>
        <div className="w-1/2 bg-gray-500 h-[1px]"></div>
      </div>
      <CardFooter className="grid grid-cols-4 gap-2">
        <div className="flex gap-2">
          <OAuthSignInButton providerName="google" ProviderIcon={FaGoogle} />
          <OAuthSignInButton providerName="discord" ProviderIcon={FaDiscord} />
          <OAuthSignInButton providerName="github" ProviderIcon={FaGithub} />
          <OAuthSignInButton providerName="twitter" ProviderIcon={FaXTwitter} />
        </div>
      </CardFooter>
    </Card>
  );
}
