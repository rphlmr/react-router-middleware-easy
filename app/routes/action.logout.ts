import { redirect } from "react-router";
import { deleteAuthSession } from "~/middleware/session";
import type { Route } from "./+types/action.logout";

export function action({ context }: Route.ActionArgs) {
  console.log("User logged out");
  deleteAuthSession(context);

  throw redirect("/");
}
