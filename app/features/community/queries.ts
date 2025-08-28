//* use drizzle
// import db from "~/db";
// import { posts, postUpvotes, topics } from "./schema";
// import { asc, count, eq } from "drizzle-orm";
// import { profiles } from "../users/schema";

import client from "~/supa-client";

//* 1. use drizzle
// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       // check schema for the fields
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopics;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       // name of createdAt is your choice, created_at is from database
//       createdAt: posts.created_at,
//       topic: topics.name,
//       author: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     //? check it out later
//     .groupBy(
//       posts.post_id,
//       topics.name,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//     )
//     .orderBy(asc(posts.post_id));
//   return allPosts;
// };

//* 2. use supabase

export const getTopics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data, error } = await client.from("topics").select("name, slug");
  // console.log(data, error);
  if (error) {
    // This will be handled by the error boundary
    throw new Error(error.message);
  }
  return data;
};

// export const getPosts = async () => {
//   const { data, error } = await client.from("posts").select(`
//     post_id,
//     title,
//     created_at,
//     topic: topics!inner (name),
//     author: profiles!posts_profile_id_profiles_profile_id_fk!inner (
//     name, username, avatar),
//     upvotes:post_upvotes (
//     count
//     )
//     `);
//   console.log(error);
//   if (error) {
//     // This will be handled by the error boundary
//     throw new Error(error.message);
//   }
//   return data;
// };

//* 3 Using supabase view
export const getPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data, error } = await client
    .from("community_post_list_view")
    .select(`*`);
  console.log(error);
  if (error) {
    // This will be handled by the error boundary
    throw new Error(error.message);
  }
  return data;
};
