import { Link, MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { Button } from "../components/ui/button";
import { PostCard } from "../../features/community/components/post-card";

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
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboard">Explore all products &rarr;</Link>
          </Button>
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions made by our community today
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id="postID"
            title="What is the key quality of a good product?"
            author="Sue"
            authorAvatarUrl="https://github.com/apple.png"
            category="Productivity"
            postedTime="12 hours ago"
          />
        ))}
      </div>
    </div>
  );
}
