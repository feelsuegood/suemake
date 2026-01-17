import { Hero } from "~/common/components/hero";
import { Route } from "./+types/category-page";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "../queries";
import { z } from "zod";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Developer Tools | suemake` },
    {
      name: "description",
      content: `Browse Developer Tools products`,
    },
  ];
};

const paramsSchema = z.object({
  category: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid params", { status: 400 });
  }
  // TODO: use promise.all to get category and products
  const category = await getCategory(data.category);
  const products = await getProductsByCategory({
    categoryId: data.category,
    page,
  });
  const totalPages = await getCategoryPages(data.category);
  return { category, products, totalPages };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title={`${loaderData.category.name}`}
        subtitle={`${loaderData.category.description}`}
      />

      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewCount={product.reviews}
            viewCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
