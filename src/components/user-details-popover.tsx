// Shows name, email, image on top right with a signout button.

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { AuthJsSignOut } from "@/actions/auth";

export default async function UserDetailsPopover({
  session,
}: {
  session: Session | null;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="size-[50px]">
          <AvatarImage
            src={session?.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      {session ? (
        <PopoverContent className="space-y-1">
          <p className="text-sm font-bold">
            Username:{" "}
            <span className="font-normal">{session?.user?.name || "N/A"}</span>
          </p>
          <p className="text-sm font-bold">
            Email:{" "}
            <span className="font-normal">{session?.user?.email || "N/A"}</span>
          </p>
          {session?.user && (
            <form action={AuthJsSignOut}>
              <Button className="w-full" type="submit">
                Sign out
              </Button>
            </form>
          )}
        </PopoverContent>
      ) : (
        <PopoverContent className="space-y-1">
          <p className="text-sm font-bold">
            Username: <span className="font-normal">Sign In Required*</span>
          </p>
          <p className="text-sm font-bold">
            Email: <span className="font-normal">Sign In Required*</span>
          </p>
        </PopoverContent>
      )}
    </Popover>
  );
}
