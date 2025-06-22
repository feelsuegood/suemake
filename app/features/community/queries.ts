import db from "~/db";
import { topics } from "./schema";

export const getTopics = async () => {
  const allTopics = await db
    .select({
      name: topics.name,
      slug: topics.slug,
    })
    .from(topics);

  return allTopics;
};
