import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Product Rankings | suemake" },
    { description: "Best products of the day" },
  ];
};

export function loader({ request, params }: Route["LoaderArgs"]) {
  if (!params?.year || !params?.month || !params?.day) {
    const now = new Date();
    return {
      products: [],
      period: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      },
    };
  }

  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const day = parseInt(params.day);

  const products: Product[] = Array.from({ length: 10 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Top Product ${index + 1} of ${month}/${day}/${year}`,
    description: "A top-ranked product of the day",
    commentCount: Math.floor(Math.random() * 1000),
    viewCount: Math.floor(Math.random() * 10000),
    upvoteCount: Math.floor(Math.random() * 5000),
  }));

  return { products, period: { year, month, day } };
}

export default function DailyLeaderboardPage({
  loaderData,
}: Route["ComponentProps"]) {
  const { products, period } = loaderData;

  if (!products || !period || !period.day) {
    return <div>No data available</div>;
  }

  const date = new Date(period.year, period.month ?? 0 - 1, period.day);
  const formattedDate = date.toLocaleDateString("default", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function getPreviousDay(year: number, month: number, day: number) {
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  function getNextDay(year: number, month: number, day: number) {
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  const prevDay = getPreviousDay(period.year, period.month ?? 0, period.day);
  const nextDay = getNextDay(period.year, period.month ?? 0, period.day);
  const now = new Date();
  const isCurrentOrFutureDay = date >= now;

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Best of {formattedDate}</h1>
          <p className="text-lg text-muted-foreground">
            Top products of the day
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/products/leaderboard/daily/${prevDay.year}/${prevDay.month}/${prevDay.day}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            &larr; Previous Day
          </Link>
          {!isCurrentOrFutureDay && (
            <Link
              to={`/products/leaderboard/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Next Day &rarr;
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
