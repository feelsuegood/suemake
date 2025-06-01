import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">Product name</h1>
            <p className="text-2xl font-light">Product Description</p>
            <div className="flex mt-5 items-center gap-2">
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-5"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote (100)
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
          to={`/products/${1}/overview`}
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
          to={`/products/${1}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
