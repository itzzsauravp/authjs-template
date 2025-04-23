// import SignUpComponentClient from "@/components/sign-in-client";
import SignUpComponentServer from "@/components/sign-in-server";
import UserDetailsPopover from "@/components/user-details-popover";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="h-screen flex justify-center container mx-auto">
      <div className="absolute top-4 right-4">
        <UserDetailsPopover session={session} />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <h1 className="font-bold text-3xl">Auth.Js (v5) Boiler Plate</h1>
          <span className="text-sm font-semibold"> - By Saurav Parajulee</span>
          <Link
            href="/protected-route"
            className="underline block text-sm ml-2 text-blue-500"
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
          <ul>
            <h1 className="font-bold text-xl mt-12">Prerequisits:</h1>
          </ul>
        </div>
        <div className="w-full">
          {/* <SignUpComponentClient /> */}
          <SignUpComponentServer />
        </div>
      </div>
    </div>
  );
}
