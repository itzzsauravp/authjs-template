import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithLabel } from "@/components/ui/input";
import OAuthSignInForm from "./authjs-sign-up-form";

export default async function SignUpComponentServer() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">
            NextJs-AuthJs-Boiler-Plate (server)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputWithLabel label="Email or Username" type="text" />
          <InputWithLabel label="Password" type="password" />
          <Button className="w-full">Sign In</Button>
        </CardContent>
        <div className="flex items-center gap-2 w-[80%] my-3 mx-auto">
          <div className="w-1/2 bg-gray-500 h-[1px]"></div>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Other Providers
          </span>
          <div className="w-1/2 bg-gray-500 h-[1px]"></div>
        </div>
        <CardFooter className="grid grid-cols-4 gap-2">
          <OAuthSignInForm providersName="google" />
          <OAuthSignInForm providersName="discord" />
          <OAuthSignInForm providersName="github" />
          <OAuthSignInForm providersName="X" />
        </CardFooter>
      </Card>
    </>
  );
}
