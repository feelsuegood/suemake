import { DateTime } from "luxon";
import { Route } from "./+types/weekly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  })
    .setZone("Australia/Brisbane")
    .setLocale("en-AU");
  return [
    {
      title: `The best of week ${date
        .startOf("week")
        .toLocaleString(DateTime.DATE_SHORT)} - ${date
        .endOf("week")
        .toLocaleString(DateTime.DATE_SHORT)} | suemake`,
    },
  ];
};

export const loader = ({ params }: Route.LoaderArgs) => {
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
  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
  }).setZone("Australia/Brisbane");
  if (!date.isValid) {
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
export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });
  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("week"));
  return (
    <div className="space-y-10">
      <Hero
        title={`The best of week ${urlDate
          .startOf("week")
          .toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
          .endOf("week")
          .toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex justify-center gap-5 items-center">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}
          >
            &larr;&nbsp; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {isToday ? null : (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}
            >
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &nbsp;&rarr;
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
