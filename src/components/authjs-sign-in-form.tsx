// Every button you see on the signup server component is a form in itself.
// This component will get the providers name from the FORM and based on that perform the signin.

import { AuthJsSignInServer } from "@/actions/auth";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const providerIcons: Record<string, IconType> = {
  github: FaGithub,
  google: FaGoogle,
  discord: FaDiscord,
  twitter: FaXTwitter,
};

export default function AuthJsSignInForm({
  providersName,
}: {
  providersName: string;
}) {
  const Icon = providerIcons[providersName.toLowerCase()] || (() => null);
  return (
    <form action={AuthJsSignInServer} className="flex gap-2">
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
