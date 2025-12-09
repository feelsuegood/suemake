import { DateTime } from "luxon";
import { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesbyDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../constants";

const paramsSchema = z.object({
  //* example - what you expect from the params
  // name: z.string().min(10),
  // email: z.string().email(),
  // coerce: convert string to number
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

//* meta function also get params
//* data is the data returned from the loader
export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  })
    .setZone("Australia/Brisbane")
    .setLocale("en-AU");
  return [
    {
      title: `The Best products of ${date.toLocaleString(
        DateTime.DATE_MED
      )} | suemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  // const { year, month, day } = params;
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "invalid_params",
        message: "Invalid params",
      },
      { status: 400 }
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
      { status: 400 }
    );
  }
  const today = DateTime.now().setZone("Australia/Brisbane").startOf("day");
  if (date > today) {
    throw data(
      { error_code: "future_date", message: "Future date" },
      { status: 400 }
    );
  }
  const url = new URL(request.url);
  const products = await getProductsByDateRange({
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getProductPagesbyDateRange({
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });
  return { products, totalPages, ...parsedData };
};

//* UI
export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  // const urlDate = DateTime.fromObject(loaderData);
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewCount={product.reviews}
            viewCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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
