import type { Route } from "./+types";

export function Component({ loaderData, actionData }: Route.ComponentProps) {
  return null;
}

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [{ title: "Submit Post" }];
}
