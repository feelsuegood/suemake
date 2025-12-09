import { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./constants";

interface ProductByDateRange {
  product_id: number;
  name: string;
  description: string;
  upvotes: string;
  views: string;
  reviews: string;
}

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}): Promise<ProductByDateRange[]> => {
  const { data, error } = await client
    .from("products")
    .select(
      `
      product_id,
      name,
      description,
      upvotes: stats->>upvotes,
      views: stats->>views,
      reviews: stats->>reviews
      `
    )
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  // in real project, we need better error handling (e.g., error boundary)
  if (error) throw error;
  return data as unknown as ProductByDateRange[];
};

export const getProductPagesbyDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}): Promise<number> => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  // in real project, we need better error handling (e.g., error boundary)
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
