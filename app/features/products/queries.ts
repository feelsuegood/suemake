import { DateTime } from "luxon";
import client from "~/supa-client";

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
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
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
    .limit(limit);
  // in real project, we need better error handling (e.g., error boundary)
  if (error) throw error;
  return data as unknown as ProductByDateRange[];
};
