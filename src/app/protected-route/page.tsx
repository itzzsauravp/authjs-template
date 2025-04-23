import Link from "next/link";

export default function ProtectedRoute() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="text-xl">
        Hello World, This is a{" "}
        <span className="font-bold">Protected Route</span>
        <Link href="/" className="underline text-center text-blue-500 block">
          Back Home
        </Link>
      </div>
    </div>
  );
}
