// Server side Signin Form

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithLabel } from "@/components/ui/input";
import AuthJsSignInForm from "./authjs-sign-up-form";
import { CredentialsSignIn } from "@/actions/auth";
import { redirect } from "next/navigation";

const serverSignInAction = async (formData: FormData) => {
  // add validation here later.
  const result = await CredentialsSignIn(formData);
  if (result?.error) {
    redirect(`/?error=${encodeURIComponent(result.message)}`);
  }
};
export default async function SignUpComponentServer({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">
            NextJs-AuthJs-Boiler-Plate (server)
          </CardTitle>
        </CardHeader>
        {errorMessage && (
          <h1 className=" text-center text-sm text-red-500 font-semibold">
            {errorMessage}
          </h1>
        )}
        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              await serverSignInAction(formData);
            }}
            className="space-y-4"
          >
            <InputWithLabel label="Email" type="text" name="email" />
            <InputWithLabel label="Password" type="password" name="password" />
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
          <AuthJsSignInForm providersName="google" />
          <AuthJsSignInForm providersName="discord" />
          <AuthJsSignInForm providersName="github" />
          <AuthJsSignInForm providersName="X" />
        </CardFooter>
      </Card>
    </>
  );
}
