import { Link, MetaFunction } from "react-router";
import type { Route } from "../+types";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Leaderboards | suemake" },
    { description: "Top products across different time periods" },
  ];
};

export function loader({ request }: Route["LoaderArgs"]) {
  const now = new Date();
  return {
    currentPeriod: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      week: Math.ceil((now.getDate() - now.getDay()) / 7),
      day: now.getDate(),
    },
  };
}

export default function LeaderboardsPage({ loaderData }: Route["ComponentProps"]) {
  const { currentPeriod } = loaderData as { currentPeriod: { year: number; month: number; week: number; day: number } };

  const leaderboards = [
    {
      title: "Yearly Rankings",
      description: "Best products of the year",
      link: `/products/leaderboards/yearly/${currentPeriod.year}`,
    },
    {
      title: "Monthly Rankings",
      description: "Best products of the month",
      link: `/products/leaderboards/monthly/${currentPeriod.year}/${currentPeriod.month}`,
    },
    {
      title: "Weekly Rankings",
      description: "Best products of the week",
      link: `/products/leaderboards/weekly/${currentPeriod.year}/${currentPeriod.week}`,
    },
    {
      title: "Daily Rankings",
      description: "Best products of the day",
      link: `/products/leaderboards/daily/${currentPeriod.year}/${currentPeriod.month}/${currentPeriod.day}`,
    },
  ];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Leaderboards</h1>
        <p className="text-lg text-muted-foreground">
          Discover the most popular products across different time periods
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {leaderboards.map((board) => (
          <Link
            key={board.title}
            to={board.link}
            className="group relative rounded-lg border p-6 hover:border-foreground"
          >
            <h2 className="text-2xl font-semibold mb-2">{board.title}</h2>
            <p className="text-muted-foreground">{board.description}</p>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 