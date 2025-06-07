import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Products | suemake" }];
};

export default function ProfileProductsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Products</h1>
    </div>
  );
}
