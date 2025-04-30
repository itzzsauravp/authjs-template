import Link from "next/link";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { Button } from "@/components/ui/button";
import { ResendSignInAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";

export default async function ProtectedRoute() {
  // const session = await auth();
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      // @ts-expect-error "cause why not"
      id: session?.userId,
    },
  });
  return (
    <div className="h-screen grid place-content-center">
      <div className="text-xl flex flex-col items-center">
        <p>
          This is a Protected Route{" "}
          <Link href="/" className="underline text-center text-blue-500">
            Back Home
          </Link>
        </p>
        <h1 className="text-center mt-6">
          You email is{" "}
          <span className="font-bold">
            {user?.emailVerified ? "Verified" : "Not Verified "}
          </span>
        </h1>
        {!user?.emailVerified && (
          <form action={ResendSignInAction}>
            <Input value={user?.email} name="email" className="hidden" />
            <Button type="submit" className="mt-2">
              Verify Now
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
