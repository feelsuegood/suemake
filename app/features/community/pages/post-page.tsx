import type { Route } from "./+types";

export function Component({ loaderData }: Route.ComponentProps) {
  return null;
}

export function loader({ request, params }: Route.LoaderArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [{ title: "Post" }];
}
