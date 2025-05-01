import { Link, MetaFunction } from "react-router";
import type { Route, Product } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | suemake" },
    { description: "Discover amazing products" },
  ];
};

export function loader({ request }: Route["LoaderArgs"]) {
  const products: Product[] = Array.from({ length: 12 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Featured Product ${index + 1}`,
    description: "An amazing product that you'll love",
    commentCount: Math.floor(Math.random() * 1000),
    viewCount: Math.floor(Math.random() * 10000),
    upvoteCount: Math.floor(Math.random() * 5000),
  }));

  return { products };
}

export default function ProductsPage({ loaderData }: Route["ComponentProps"]) {
  const { products } = loaderData;

  if (!products) {
    return <div>No products available</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing products
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/products/submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Submit Product
          </Link>
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