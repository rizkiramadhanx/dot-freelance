import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sessionData, sessionOptions } from "./app/utils/auth-session";

// fetching data by token yang ada disession (server-side) tidak kelihatan di log browser
async function getUser(access_token: string) {
  const res = await fetch("https://dummyjson.com/auth/me", {
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

  // get token from session-cookie
  const session = await getIronSession<sessionData>(
    await cookies(),
    sessionOptions
  );
  console.log(session.access_token);

  const user = await getUser(session.access_token!);

  if (!user) {
    if (pathname === "/protected") {
      console.log("user not found");
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
  matcher: ["/protected", "/login"],
};
