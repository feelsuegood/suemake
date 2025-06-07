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

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Message Detail</h1>
    </div>
  );
}
