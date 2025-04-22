import { Form, redirect } from "react-router";
import { getSession, hasAuthSession } from "~/middleware/session";
import type { Route } from "./+types/login";

export function loader({ context }: Route.LoaderArgs) {
  if (hasAuthSession(context)) {
    throw redirect("/dashboard");
  }

  return null;
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const session = getSession(context);
  session.set("auth", { username, role: username === "rphlmr" ? "admin" : "user" });

  return redirect("/dashboard");
}

export default function Login() {
  return (
    <div className="flex flex-col">
      <h1>Login</h1>
      <Form className="flex flex-col space-y-4" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
