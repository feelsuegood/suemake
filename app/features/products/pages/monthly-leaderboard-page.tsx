import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Monthly Product Rankings | suemake" },
    { description: "Best products of the month" },
  ];
};

export function loader({ request, params }: Route["LoaderArgs"]) {
  if (!params?.year || !params?.month) {
    const now = new Date();
    return {
      products: [],
      period: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      },
    };
  }

  const year = parseInt(params.year);
  const month = parseInt(params.month);

  const products: Product[] = Array.from({ length: 10 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Top Product ${index + 1} of ${month}/${year}`,
    description: "A top-ranked product of the month",
    commentCount: Math.floor(Math.random() * 5000),
    viewCount: Math.floor(Math.random() * 50000),
    upvoteCount: Math.floor(Math.random() * 25000),
  }));

  return { products, period: { year, month } };
}

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route["ComponentProps"]) {
  const { products, period } = loaderData;

  if (!products || !period || !period.month) {
    return <div>No data available</div>;
  }

  const monthName = new Date(period.year, period.month - 1).toLocaleString(
    "default",
    { month: "long" },
  );

  function getPreviousMonth(year: number, month: number) {
    return month === 1
      ? { year: year - 1, month: 12 }
      : { year, month: month - 1 };
  }

  function getNextMonth(year: number, month: number) {
    return month === 12
      ? { year: year + 1, month: 1 }
      : { year, month: month + 1 };
  }

  const prevMonth = getPreviousMonth(period.year, period.month);
  const nextMonth = getNextMonth(period.year, period.month);
  const now = new Date();
  const isCurrentOrFutureMonth =
    period.year > now.getFullYear() ||
    (period.year === now.getFullYear() && period.month >= now.getMonth() + 1);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Best of {monthName} {period.year}
          </h1>
          <p className="text-lg text-muted-foreground">
            Top products of the month
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/products/leaderboards/monthly/${prevMonth.year}/${prevMonth.month}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            &larr;{" "}
            {new Date(prevMonth.year, prevMonth.month - 1).toLocaleString(
              "default",
              { month: "short" },
            )}
          </Link>
          {!isCurrentOrFutureMonth && (
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              {new Date(nextMonth.year, nextMonth.month - 1).toLocaleString(
                "default",
                { month: "short" },
              )}{" "}
              &rarr;
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
