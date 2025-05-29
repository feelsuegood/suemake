import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | suemake" },
    {
      name: "description",
      content: "Top products across different time periods",
    },
  ];
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-20">
      {/* from-background: automatically changes to light mode or dard mode */}
      <Hero
        title="Leaderboards"
        subtitle="The most popular products on suemake"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products on suemake by day
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">
            Explore all leaderboards &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products on suemake by week
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">
            Explore all leaderboards &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products on suemake by month
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">
            Explore all leaderboards &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products on suemake by year
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">
            Explore all leaderboards &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
