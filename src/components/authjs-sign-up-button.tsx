"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { oAuthSignInClient } from "@/actions/auth";
export default function OAuthSignInButton({
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
        onClick={async () => await oAuthSignInClient(providerName)}
      >
        <ProviderIcon />
      </Button>
    </>
  );
}
