import { redirect } from "react-router";
import { Route } from "./+types/leaderboards-redirection-page";

// request - like cookies,, headers, tokens
export function loader({ params, request, context }: Route.LoaderArgs) {
  const { period } = params;
  return redirect(`/products/leaderboards/${period}`);
}
