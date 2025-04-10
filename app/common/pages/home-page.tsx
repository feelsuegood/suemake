import { MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Home | suemake",
    },
    { description: "Welcome to suemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id="productID"
            name="Product Name"
            description="Product Description"
            commentCount={100}
            viewCount={100}
            upvoteCount={100}
          />
        ))}
      </div>
    </div>
  );
}
