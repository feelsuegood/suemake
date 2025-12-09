import { data, Outlet } from "react-router";
import z from "zod";
import { Route } from "./+types/leaderboards-layout";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      { error_code: "invalid_search_params", message: "Invalid search params" },
      { status: 400 }
    );
  }
  return { page: parsedData.page };
};

export default function LeaderboardsLayout() {
  return <Outlet />;
}
