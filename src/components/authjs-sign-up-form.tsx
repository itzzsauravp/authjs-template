"use client";
import { oAuthSignInServer } from "@/actions/auth";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const providerIcons: Record<string, IconType> = {
  github: FaGithub,
  google: FaGoogle,
  discord: FaDiscord,
  x: FaXTwitter,
};

export default function OAuthSignInForm({
  providersName,
}: {
  providersName: string;
}) {
  const Icon = providerIcons[providersName.toLowerCase()] || (() => null);
  return (
    <form action={oAuthSignInServer} className="flex gap-2">
      <input
        type="text"
        className="hidden"
        readOnly
        name="provider"
        value={providersName.toLowerCase()}
      />
      <Button type="submit" className="w-full">
        <Icon />
      </Button>
    </form>
  );
}
