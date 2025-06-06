import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { auth } from "../auth";
export default async function middleware(req: NextRequest) {
  // this dont work in edge run time it requires some node_childprocess which cannot run here.
  // const session = await auth();

  const session_token = req.cookies.get("authjs.session-token");
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Token Payload: ", token);
  if (!session_token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  console.log("Middleware running at:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected-route"], // only triggers on home route
};
