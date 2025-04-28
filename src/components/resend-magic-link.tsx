import { ResendSignInAction } from "@/actions/auth";
import AuthJsSignInForm from "./authjs-sign-in-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { InputWithLabel } from "./ui/input";

export default function ResendSignInComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          <h1 className="font-bold text-2xl">NextJs-AuthJs-Boiler-Plate</h1>
          <p className="text-sm mt-2 font-semibold">(Magic Link)</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (fromData) => {
            "use server";
            await ResendSignInAction(fromData);
          }}
          className="space-y-4"
        >
          <InputWithLabel label="Email" type="text" name="email" />
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
        <AuthJsSignInForm providersName="twitter" />
      </CardFooter>
    </Card>
  );
}
