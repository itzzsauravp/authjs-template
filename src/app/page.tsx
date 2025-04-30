import SignUpComponentClient from "@/components/sign-in-client";
// import SignUpComponentServer from "@/components/sign-in-server";
// import ResendSignInComponent from "@/components/resend-magic-link";
import UserDetailsPopover from "@/components/user-details-popover";
import Link from "next/link";
import { auth } from "../../auth";
import { Fingerprint } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  return (
    <div className="h-screen flex justify-center container mx-auto">
      {session && (
        <div className="fixed flex items-center gap-3 top-12">
          <Fingerprint height={40} width={40} />
          <span className="font-bold text-xl">You are Authenticated</span>
        </div>
      )}
      <div className="fixed top-4 right-4">
        <UserDetailsPopover session={session} />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <h1 className="font-bold text-3xl">Auth.Js (v5) Template</h1>
          <span className="text-sm font-semibold"> - By Saurav Parajulee</span>
          <Link
            href="/protected-route"
            className="underline block text-sm mt-12 ml-2 text-blue-500"
          >
            Try visiting this route{" "}
          </Link>
          <div className="text-sm mt-2 ml-2">
            {!session ? (
              <p>Probably wont work because you are not signed in.</p>
            ) : (
              <p>Try Now.</p>
            )}
          </div>
        </div>
        <div className="w-full">
          <SignUpComponentClient />
          {/* <SignUpComponentServer
            errorMessage={(await searchParams).error as string}
          /> */}
          {/* <ResendSignInComponent /> */}
        </div>
      </div>
    </div>
  );
}
