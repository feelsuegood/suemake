import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Yearly Product Rankings | suemake" },
    { description: "Best products of the year" },
  ];
};

export function loader({ request, params }: Route["LoaderArgs"]) {
  const year = parseInt(params?.year || new Date().getFullYear().toString());

  const products: Product[] = Array.from({ length: 10 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Top Product ${index + 1} of ${year}`,
    description: "A top-ranked product of the year",
    commentCount: Math.floor(Math.random() * 10000),
    viewCount: Math.floor(Math.random() * 100000),
    upvoteCount: Math.floor(Math.random() * 50000),
  }));

  return { products, period: { year } };
}

export default function YearlyLeaderboardPage({
  loaderData,
}: Route["ComponentProps"]) {
  const { products, period } = loaderData;

  if (!products || !period) {
    return <div>No data available</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Best of {period.year}</h1>
          <p className="text-lg text-muted-foreground">
            Top products of the year
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/products/leaderboard/yearly/${period.year - 1}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            &larr; {period.year - 1}
          </Link>
          {period.year < new Date().getFullYear() && (
            <Link
              to={`/products/leaderboard/yearly/${period.year + 1}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              {period.year + 1} &rarr;
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
