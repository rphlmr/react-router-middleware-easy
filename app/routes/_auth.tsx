import { NavLink, Outlet, useFetcher } from "react-router";
import { authMiddleware, getAuthSession } from "~/middleware/session";
import type { Route } from "./+types/_auth";

export const unstable_middleware = [authMiddleware];

export function loader({ context }: Route.LoaderArgs) {
  const authSession = getAuthSession(context);
  return { username: authSession.username };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <span>@{loaderData.username}</span>
        <NavLink to="/" className="text-blue-400">
          Home
        </NavLink>
        <button type="button" onClick={() => fetcher.submit(null, { action: "/action/logout", method: "post" })}>
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
}
