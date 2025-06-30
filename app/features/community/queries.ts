import db from "~/db";
import { posts, postUpvotes, topics } from "./schema";
import { asc, count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";

// use drizzle
export const getTopics = async () => {
  const allTopics = await db
    .select({
      // check schema for the fields
      name: topics.name,
      slug: topics.slug,
    })
    .from(topics);
  return allTopics;
};

export const getPosts = async () => {
  const allPosts = await db
    .select({
      id: posts.post_id,
      title: posts.title,
      // name of createdAt is your choice, created_at is from database
      createdAt: posts.created_at,
      topic: topics.name,
      author: profiles.name,
      authorAvatarUrl: profiles.avatar,
      username: profiles.username,
      upvotes: count(postUpvotes.post_id),
    })
    .from(posts)
    .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
    .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
    .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
    //? check it out later
    .groupBy(
      posts.post_id,
      topics.name,
      profiles.name,
      profiles.avatar,
      profiles.username,
    )
    .orderBy(asc(posts.post_id));
  return allPosts;
};
