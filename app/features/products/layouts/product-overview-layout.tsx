import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";
import { getProductById } from "../queries";

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [];
  return [
    { title: `${data.product.name} Overview | suemake` },
    { name: "description", content: data.product.tagline },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const product = await getProductById(Number(params.productId));
  return { product };
};

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">{loaderData.product.name}</h1>
            <p className="text-2xl font-light">{loaderData.product.tagline}</p>
            <div className="flex mt-5 items-center gap-2">
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-5"
                    fill={i < Math.floor(loaderData.product.average_rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">{loaderData.product.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote ({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      {/* Description */}
      <div className="flex gap-2.5">
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-primary text-primary-foreground",
            )
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-primary text-primary-foreground",
            )
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet context={{ product_id: loaderData.product.product_id, description: loaderData.product.description, how_it_works: loaderData.product.how_it_works, review_count: loaderData.product.reviews, }} />
      </div>
    </div>
  );
}
