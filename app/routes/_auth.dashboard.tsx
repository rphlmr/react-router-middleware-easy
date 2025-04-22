import { Form, data } from "react-router";
import { namedAction } from "remix-utils/named-action";
import type { Route } from "./+types/_auth.dashboard";

async function createProject(name: string) {
  console.log("create project", name);
  return await Promise.resolve();
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return namedAction(formData, {
    async "create-project"() {
      await createProject(formData.get("projectName") as string);
      return data(null);
    },
  });
}

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>
      <Form className="flex flex-col" method="post" navigate={false}>
        <input type="text" name="projectName" placeholder="Project name" />
        <button type="submit" name="intent" value="create-project">
          Submit
        </button>
      </Form>
    </div>
  );
}
