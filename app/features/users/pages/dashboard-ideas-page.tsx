import type { Route } from "../+types";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaFunction) {
  return [];
}

export default function DashboardIdeasPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Dashboard Ideas</h1>
    </div>
  );
}
