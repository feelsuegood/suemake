import { Hero } from "~/common/components/hero";
import { Route } from "./+types/category-page";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Developer Tools | suemake` },
    {
      name: "description",
      content: `Browse Developer Tools products`,
    },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-20">
      <Hero
        title={`Developer Tools`}
        subtitle={`Tools for developers to build their products`}
      />

      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
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
      </div>
      <ProductPagination totalPage={10} />
    </div>
  );
}
