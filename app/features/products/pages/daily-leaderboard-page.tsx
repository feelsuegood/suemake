import { DateTime } from "luxon";
import { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
  //* example - what you expect from the params
  // name: z.string().min(10),
  // email: z.string().email(),
  // coerce: convert string to number
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
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
  const urlDate = DateTime.fromObject(loaderData);
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));
  return (
    <div className="space-y-10">
      <Hero
        title={`The best of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}
      />
      <div className="flex justify-center gap-5 items-center">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr;&nbsp; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {isToday ? null : (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &nbsp;&rarr;
            </Link>
          </Button>
        )}
      </div>
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
      <ProductPagination totalPage={10} />
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
