import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Search Products | suemake" },
    { description: "Search for products" },
  ];
};

export function loader({ request }: Route["LoaderArgs"]) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  if (!query) {
    return { products: [], query };
  }

  const products: Product[] = Array.from({ length: 6 }).map((_, index) => ({
    id: `search-${index}`,
    name: `${query} Product ${index + 1}`,
    description: `A product matching your search for "${query}"`,
    commentCount: Math.floor(Math.random() * 1000),
    viewCount: Math.floor(Math.random() * 10000),
    upvoteCount: Math.floor(Math.random() * 5000),
  }));

  return { products, query };
}

export default function SearchPage({ loaderData }: Route["ComponentProps"]) {
  const { products, query } = loaderData;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        {query ? (
          <p className="text-lg text-muted-foreground">
            Showing results for "{query}"
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            Enter a search term to find products
          </p>
        )}
      </div>

      <form className="mb-8">
        <div className="flex gap-4">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search products..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : query ? (
        <p className="text-center text-muted-foreground">
          No products found for "{query}"
        </p>
      ) : null}
    </div>
  );
} 