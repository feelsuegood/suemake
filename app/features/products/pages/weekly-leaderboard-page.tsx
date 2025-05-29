import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Weekly Product Rankings | suemake" },
    { description: "Best products of the week" },
  ];
};

export function loader({ request, params }: Route["LoaderArgs"]) {
  if (!params?.year || !params?.week) {
    const now = new Date();
    const currentWeek = Math.ceil((now.getDate() - now.getDay()) / 7);
    return {
      products: [],
      period: {
        year: now.getFullYear(),
        week: currentWeek,
      },
    };
  }

  const year = parseInt(params.year);
  const week = parseInt(params.week);

  const products: Product[] = Array.from({ length: 10 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Top Product ${index + 1} of Week ${week}, ${year}`,
    description: "A top-ranked product of the week",
    commentCount: Math.floor(Math.random() * 2000),
    viewCount: Math.floor(Math.random() * 20000),
    upvoteCount: Math.floor(Math.random() * 10000),
  }));

  return { products, period: { year, week } };
}

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route["ComponentProps"]) {
  const { products, period } = loaderData;

  if (!products || !period || !period.week) {
    return <div>No data available</div>;
  }

  function getWeekRange(year: number, week: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstWeekDay = firstDayOfYear.getDay();
    const offsetDays = (week - 1) * 7 - firstWeekDay + 1;

    const startDate = new Date(year, 0, offsetDays);
    const endDate = new Date(year, 0, offsetDays + 6);

    return {
      start: startDate.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      }),
      end: endDate.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      }),
    };
  }

  function getPreviousWeek(year: number, week: number) {
    if (week === 1) {
      return { year: year - 1, week: 52 };
    }
    return { year, week: week - 1 };
  }

  function getNextWeek(year: number, week: number) {
    if (week === 52) {
      return { year: year + 1, week: 1 };
    }
    return { year, week: week + 1 };
  }

  const weekRange = getWeekRange(period.year, period.week);
  const prevWeek = getPreviousWeek(period.year, period.week);
  const nextWeek = getNextWeek(period.year, period.week);

  const now = new Date();
  const currentWeek = Math.ceil((now.getDate() - now.getDay()) / 7);
  const isCurrentOrFutureWeek =
    period.year > now.getFullYear() ||
    (period.year === now.getFullYear() && period.week >= currentWeek);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Week {period.week}, {period.year}
          </h1>
          <p className="text-lg text-muted-foreground">
            {weekRange.start} - {weekRange.end}
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/products/leaderboard/weekly/${prevWeek.year}/${prevWeek.week}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            &larr; Previous Week
          </Link>
          {!isCurrentOrFutureWeek && (
            <Link
              to={`/products/leaderboard/weekly/${nextWeek.year}/${nextWeek.week}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Next Week &rarr;
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
