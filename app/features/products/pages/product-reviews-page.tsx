import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";

export const meta = () => {
  return [
    { title: `Reviews for Product` },
    { name: "description", content: `Reviews for product` },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const reviews = await getReviews(Number(params.productId));
  return { reviews };
};

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{review_count} {review_count === "1" ? "Review" : "Reviews"}</h2>
          <DialogTrigger>
            <Button variant={"secondary"}>Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              avatarUrl={review.user.avatar}
              avatarFallback={review.user.name.charAt(0)}
              username={review.user.name}
              handle={review.user.username}
              rating={review.rating}
              content={review.review}
              createdAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
