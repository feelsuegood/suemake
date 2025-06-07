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

export default function NotificationsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
}
