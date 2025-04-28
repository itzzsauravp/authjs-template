"use client";

// Every button you see on the signup client component is a button in itself.
// This component will get the providers name and based on that perform the signin.

import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { AuthJsSignInClient } from "@/actions/auth";
export default function AuthJsSignInButton({
  providerName,
  ProviderIcon,
}: {
  providerName: string;
  ProviderIcon: LucideIcon | IconType;
}) {
  return (
    <>
      <Button
        className="w-full"
        onClick={async () => await AuthJsSignInClient(providerName)}
      >
        <ProviderIcon />
      </Button>
    </>
  );
}
