import {
  createCookie,
  createCookieSessionStorage,
  redirect,
  type unstable_MiddlewareFunction,
  type unstable_RouterContextProvider,
} from "react-router";
import { unstable_createSessionMiddleware } from "remix-utils/middleware/session";
import { env } from "~/utils/env";

const sessionStorage = createCookieSessionStorage({
  cookie: createCookie("session", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secrets: [env.SESSION_SECRET],
    secure: env.NODE_ENV === "production",
  }),
});

const authSessionKey = "auth";

export type SessionData = {
  [authSessionKey]: {
    username: string;
    role: "admin" | "user";
  };
};

export const [sessionMiddleware, getSession] = unstable_createSessionMiddleware<SessionData>({
  ...sessionStorage,
  // If a user doesn't come back to the app within 30 days, their session will be deleted.
  commitSession(session) {
    return sessionStorage.commitSession(session, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  },
});

export function getAuthSession(context: unstable_RouterContextProvider) {
  const authSession = getSession(context).get("auth");

  if (!authSession) {
    throw new Error("Auth session is missing. This should not happen.");
  }

  return authSession;
}

export function deleteAuthSession(context: unstable_RouterContextProvider) {
  getSession(context).unset("auth");
}

export function hasAuthSession(context: unstable_RouterContextProvider) {
  const authSession = getSession(context).get("auth");

  return Boolean(authSession);
}

export const authMiddleware: unstable_MiddlewareFunction = ({ context }) => {
  console.log("checking auth");
  const authSession = getSession(context).get("auth");

  console.log(authSession);

  if (!authSession) {
    throw redirect("/login");
  }
};
