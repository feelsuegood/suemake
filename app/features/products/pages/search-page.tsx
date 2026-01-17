import { Hero } from "~/common/components/hero";
import { Route } from "./+types/search-page";
import z from "zod";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getPagesBySearch, getProductsBySearch } from "../queries";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: "Search Products | suemake" },
    { name: "description", content: "Search for products" },
  ];
};

//* validate input
const paramsSchema = z.object({
  query: z.string().optional().default(""),
  //TODO: every leaderbord page needs this config
  page: z.coerce.number().optional().default(1),
});

// params comes from the url, query comes from the request
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  // console.log(url);
  //*url.searchParams is like an instance of class
  // console.log(Object.fromEntries(url.searchParams), url.searchParams);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    //* throw data: customization error
    // throw data(
    //   { error_code: "invalid_params", message: "Invalid params" },
    //   { status: 400 },
    // );
    throw new Error("Invalid params");
  }
  //database search
  // console.log(parsedData);
  if(parsedData.query===""){
    return {products: [], totalPages: 1};
  }
  const products = await getProductsBySearch({query: parsedData.query, page: parsedData.page});
  const totalPages = await getPagesBySearch({query: parsedData.query});
  return { products, totalPages };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Search"
        subtitle="Search for products by title or description"
      />
      {/* <form></form> is from html, Form is from react-router */}
      <Form className="flex justify-center max-w-screen-sm items-center mx-auto gap-2">
        <Input
          name="query"
          placeholder="Search for products"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
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
