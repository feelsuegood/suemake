import { Form } from "react-router";
import type { Route } from "./+types/new-product-review-page";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Write a Review - Product ${params.productId}` },
    {
      name: "description",
      content: `Submit a review for product ${params.productId}`,
    },
  ];
};

export default function NewProductReviewPage({ params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Write a Review</h1>

      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <Textarea
            id="content"
            name="content"
            required
            placeholder="Share your thoughts about this product..."
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}
