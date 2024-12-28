import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: process.env.IRON_COOKIE_NAME || "APP_NAME",
  password:
    process.env.IRON_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieOptions: {
    // always false because on-premise
    secure: false,
    // secure: process.env.NODE_ENV === "production",
  },
};

export type sessionData = {
  access_token: string | null;
};
