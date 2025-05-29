import { redirect } from "react-router";

// loader function is run from the server side
export function loader() {
  return redirect("/products/leaderboard");
  //* can return json http response
  // return Response.json({hello: "world"})
}
