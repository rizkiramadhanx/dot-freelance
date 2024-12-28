import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sessionData, sessionOptions } from "./app/utils/auth-session";

// fetching data by token yang ada disession (server-side) tidak kelihatan di log browser
async function getUser(access_token: string) {
  // get user data
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status !== 200) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // get token from session-cookie
  const session = await getIronSession<sessionData>(
    await cookies(),
    sessionOptions
  );

  const user = await getUser(session.access_token!);

  if (!user) {
    if (pathname === "/protected") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/login") {
      return NextResponse.next();
    }
  }

  if (user) {
    if (pathname === "/protected") {
      return NextResponse.next();
    }
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected", "/login", "/"],
};
