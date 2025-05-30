import { Link } from "react-router";
import type { Route } from "./+types/product-reviews-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Reviews for Product ${params.productId}` },
    { name: "description", content: `Reviews for product ${params.productId}` },
  ];
};

export default function ProductReviewsPage() {
  return <div className="container mx-auto py-6"></div>;
}
