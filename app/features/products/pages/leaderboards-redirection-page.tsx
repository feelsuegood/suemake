import { data, redirect } from "react-router";
import { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";

// request - like cookies, headers, tokens
export function loader({ params, request, context }: Route.LoaderArgs) {
  const { period } = params;
  let url: string;
  const today = DateTime.now().setZone("Australia/Brisbane");
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    //*both are same
    // return new Response(null, { status: 400 });
    return data(null, { status: 400 });
  }
  return redirect(url);
}
