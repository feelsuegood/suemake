import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";

export const meta = () => {
  return [
    { title: `Reviews for Product` },
    { name: "description", content: `Reviews for product` },
  ];
};

export default function ProductReviewsPage() {
  return (
    <div className="space-y-10 max-w-xl">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">10 Reviews</h2>
        <Button variant={"secondary"}>Write a review</Button>
      </div>
      <div className="space-y-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <ReviewCard
            avatarUrl="https://github.com/feelsuegood.png"
            avatarFallback="S"
            username="John Doe"
            handle="username"
            rating={2}
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            createdAt="10 days ago"
          />
        ))}
      </div>
    </div>
  );
}
