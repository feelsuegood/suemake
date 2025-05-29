import { DateTime } from "luxon";
import { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";

const paramsSchema = z.object({
  //* example - what you expect from the params
  // name: z.string().min(10),
  // email: z.string().email(),
  // coerce: convert string to number
  year: z.coerce.number().int().min(1900).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  day: z.coerce.number().int().min(1).max(31),
});

export const loader = ({ params }: Route.LoaderArgs) => {
  // const { year, month, day } = params;
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "invalid_params",
        message: "Invalid params",
      },
      { status: 400 },
    );
  }
  // const date = DateTime.fromObject({
  //   year: parsedData.year,
  //   month: parsedData.month,
  //   day: parsedData.day,
  // }).setZone("Australia/Brisbane");
  const date = DateTime.fromObject(parsedData).setZone("Australia/Brisbane");
  if (!date.isValid) {
    //! wrong: return data
    throw data(
      { error_code: "invalid_date", message: "Invalid date" },
      { status: 400 },
    );
  }
  const today = DateTime.now().setZone("Australia/Brisbane").startOf("day");
  if (date > today) {
    throw data(
      { error_code: "future_date", message: "Future date" },
      { status: 400 },
    );
  }
  return { ...parsedData };
};

//* UI
export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const date = DateTime.fromObject(loaderData);
  return (
    <div>
      <Hero title={`The best of ${date.toLocaleString(DateTime.DATE_MED)}`} />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentCount={100}
            viewCount={100}
            upvoteCount={100}
          />
        ))}
      </div>
    </div>
  );
}

//* Error Handling - this is optional. if it doesn't exist, root error boundary will handle the error
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // console.log("😱", error);
  //* error from loader
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  //* error from Error class
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown Error</div>;
}
