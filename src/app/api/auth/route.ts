import { sessionData, sessionOptions } from "@/app/utils/auth-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const session = await getIronSession<sessionData>(
    await cookies(),
    sessionOptions
  );
  const { username, password } = await request.json();

  const login = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    credentials: "include",
  });

  if (login.status !== 200) {
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const result = await login.json();

  session.access_token = result.accessToken;
  await session.save();

  return new Response(JSON.stringify({ message: "Login success" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE() {
  const session = await getIronSession<sessionData>(
    await cookies(),
    sessionOptions
  );
  session.access_token = null;
  await session.save();
  return new Response(JSON.stringify(session), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET() {
  const session = await getIronSession<sessionData>(
    await cookies(),
    sessionOptions
  );

  return new Response(JSON.stringify(session), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
