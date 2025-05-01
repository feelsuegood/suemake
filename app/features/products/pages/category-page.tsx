import { Link, MetaFunction } from "react-router";
import type { Route, Product, Category } from "../+types";
import { ProductCard } from "../components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Category Products | suemake" },
    { description: "Browse products in this category" },
  ];
};

export function loader({ request, params }: Route["LoaderArgs"]) {
  if (!params?.category) {
    return { products: [], category: null };
  }

  const category: Category = {
    id: params.category,
    name: params.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: `Discover amazing ${params.category
      .split("-")
      .join(" ")} products`,
    productCount: 50,
  };

  const products: Product[] = Array.from({ length: 9 }).map((_, index) => ({
    id: `${category.id}-product-${index}`,
    name: `${category.name} Product ${index + 1}`,
    description: `A great product in the ${category.name} category`,
    commentCount: Math.floor(Math.random() * 1000),
    viewCount: Math.floor(Math.random() * 10000),
    upvoteCount: Math.floor(Math.random() * 5000),
  }));

  return { products, category };
}

export default function CategoryPage({ loaderData }: Route["ComponentProps"]) {
  const { products, category } = loaderData;

  if (!products || !category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Link to="/products/categories" className="hover:text-foreground">
            Categories
          </Link>
          <span>/</span>
          <span>{category.name}</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        <p className="text-lg text-muted-foreground">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
} 