"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

import { signIn } from "next-auth/webauthn";

export default function PassKeySignIn() {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <Button
          className="w-full"
          type="button"
          onClick={() => signIn("passkey", { action: "register" })}
        >
          Register Passkey
        </Button>
      ) : status === "unauthenticated" ? (
        <Button
          type="button"
          className="w-full"
          onClick={() => signIn("passkey")}
        >
          Use Passkey
        </Button>
      ) : null}
    </div>
  );
}
