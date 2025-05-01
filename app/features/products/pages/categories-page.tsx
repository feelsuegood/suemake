import { Link, MetaFunction } from "react-router";
import type { Route, Category } from "../+types";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Categories | suemake" },
    { description: "Browse products by category" },
  ];
};

export function loader({ request }: Route["LoaderArgs"]) {
  const categories: Category[] = [
    {
      id: "productivity",
      name: "Productivity",
      description: "Tools to help you work better",
      productCount: 150,
    },
    {
      id: "developer-tools",
      name: "Developer Tools",
      description: "Software development tools and utilities",
      productCount: 120,
    },
    {
      id: "design",
      name: "Design",
      description: "Design tools and resources",
      productCount: 80,
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "Marketing and growth tools",
      productCount: 95,
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Data analytics and insights tools",
      productCount: 65,
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      description: "Artificial intelligence and machine learning products",
      productCount: 110,
    },
  ];

  return { categories };
}

export default function CategoriesPage({ loaderData }: Route["ComponentProps"]) {
  const { categories } = loaderData;

  if (!categories) {
    return <div>No categories available</div>;
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Categories</h1>
        <p className="text-lg text-muted-foreground">
          Browse products by category
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products/categories/${category.id}`}
            className="group relative rounded-lg border p-6 hover:border-foreground"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <span className="text-sm text-muted-foreground">
                {category.productCount} products
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{category.description}</p>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 