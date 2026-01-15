import { pgTable, foreignKey, uuid, timestamp, bigint, text, integer, boolean, jsonb, check, primaryKey, pgView, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const jobType = pgEnum("job_type", ['full-time', 'part-time', 'contract', 'internship'])
export const location = pgEnum("location", ['remote', 'on-site', 'hybrid'])
export const notificationType = pgEnum("notification_type", ['follow', 'review', 'reply', 'mention'])
export const productStage = pgEnum("product_stage", ['idea', 'prototype', 'mvp', 'launched'])
export const role = pgEnum("role", ['developer', 'designer', 'entrepreneur', 'investor', 'other'])
export const salaryRange = pgEnum("salary_range", ['$0 - $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '$30,000 - $40,000', '$40,000 - $50,000', '$50,000 - $60,000', '$60,000 - $70,000', '$70,000 - $80,000', '$80,000 - $90,000'])


export const follows = pgTable("follows", {
	followerId: uuid("follower_id"),
	followingId: uuid("following_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.followerId],
			foreignColumns: [profiles.profileId],
			name: "follows_follower_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.followingId],
			foreignColumns: [profiles.profileId],
			name: "follows_following_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
]);

export const gptIdeas = pgTable("gpt_ideas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	gptIdeaId: bigint("gpt_idea_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "gpt_ideas_gpt_idea_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	idea: text().notNull(),
	views: integer().default(0).notNull(),
	claimedAt: timestamp("claimed_at", { mode: 'string' }),
	claimedBy: uuid("claimed_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.claimedBy],
			foreignColumns: [profiles.profileId],
			name: "gpt_ideas_claimed_by_profiles_profile_id_fk"
		}).onDelete("set null"),
]);

export const notifications = pgTable("notifications", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	notificationId: bigint("notification_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "notifications_notification_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	sourceId: uuid("source_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	targetId: uuid("target_id").notNull(),
	type: notificationType().notNull(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.postId],
			name: "notifications_post_id_posts_post_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "notifications_product_id_products_product_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sourceId],
			foreignColumns: [profiles.profileId],
			name: "notifications_source_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.targetId],
			foreignColumns: [profiles.profileId],
			name: "notifications_target_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
]);

export const jobs = pgTable("jobs", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jobId: bigint("job_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "jobs_job_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	position: text().notNull(),
	overview: text().notNull(),
	responsibilities: text().notNull(),
	qualifications: text().notNull(),
	benefits: text().notNull(),
	skills: text().notNull(),
	companyName: text("company_name").notNull(),
	companyLogo: text("company_logo").notNull(),
	companyLocation: text("company_location").notNull(),
	applyUrl: text("apply_url").notNull(),
	jobType: jobType("job_type").notNull(),
	location: location().notNull(),
	salaryRange: salaryRange("salary_range").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const messages = pgTable("messages", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	messageId: bigint("message_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "messages_message_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	messageRoomId: bigint("message_room_id", { mode: "number" }),
	senderId: uuid("sender_id"),
	content: text().notNull(),
	seen: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.messageRoomId],
			foreignColumns: [messageRooms.messageRoomId],
			name: "messages_message_room_id_message_rooms_message_room_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [profiles.profileId],
			name: "messages_sender_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
]);

export const postReplies = pgTable("post_replies", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	replyId: bigint("reply_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "post_replies_reply_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	parentId: bigint("parent_id", { mode: "number" }),
	profileId: uuid("profile_id").notNull(),
	reply: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.replyId],
			name: "post_replies_parent_id_post_replies_reply_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.postId],
			name: "post_replies_post_id_posts_post_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "post_replies_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
]);

export const posts = pgTable("posts", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "posts_post_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	title: text().notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	topicId: bigint("topic_id", { mode: "number" }),
	profileId: uuid("profile_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	upvotes: bigint({ mode: "number" }).default(0),
}, (table) => [
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "posts_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.topicId],
			foreignColumns: [topics.topicId],
			name: "posts_topic_id_topics_topic_id_fk"
		}).onDelete("cascade"),
]);

export const profiles = pgTable("profiles", {
	profileId: uuid("profile_id").primaryKey().notNull(),
	name: text().notNull(),
	avatar: text(),
	username: text().notNull(),
	headline: text(),
	bio: text(),
	role: role().default('developer').notNull(),
	stats: jsonb(),
	views: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [users.id],
			name: "profiles_profile_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const products = pgTable("products", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "products_product_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	name: text().notNull(),
	tagline: text().notNull(),
	description: text().notNull(),
	howItWorks: text("how_it_works").notNull(),
	icon: text().notNull(),
	url: text().notNull(),
	stats: jsonb().default({"views":0,"reviews":0,"upvotes":0}).notNull(),
	profileId: uuid("profile_id").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoryId: bigint("category_id", { mode: "number" }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.categoryId],
			name: "products_category_id_categories_category_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "products_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
]);

export const teams = pgTable("teams", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	teamId: bigint("team_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "team_team_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	productName: text("product_name").notNull(),
	productStage: productStage("product_stage").notNull(),
	teamSize: integer("team_size").notNull(),
	equitySplit: integer("equity_split").notNull(),
	roles: text().notNull(),
	productDescription: text("product_description").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	check("equity_split_check", sql`(equity_split >= 1) AND (equity_split <= 100)`),
	check("product_description_check", sql`length(product_description) <= 200`),
	check("team_size_check", sql`(team_size >= 1) AND (team_size <= 100)`),
]);

export const reviews = pgTable("reviews", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	reviewId: bigint("review_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "reviews_review_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }),
	profileId: uuid("profile_id"),
	rating: integer().notNull(),
	review: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "reviews_product_id_products_product_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "reviews_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	check("rating_check", sql`(rating >= 1) AND (rating <= 5)`),
]);

export const categories = pgTable("categories", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoryId: bigint("category_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "categories_category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	name: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const messageRooms = pgTable("message_rooms", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	messageRoomId: bigint("message_room_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "message_rooms_message_room_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const topics = pgTable("topics", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	topicId: bigint("topic_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "topics_topic_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	name: text().notNull(),
	slug: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const postUpvotes = pgTable("post_upvotes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }).notNull(),
	profileId: uuid("profile_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.postId],
			name: "post_upvotes_post_id_posts_post_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "post_upvotes_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.postId, table.profileId], name: "post_upvotes_post_id_profile_id_pk"}),
]);

export const gptIdeasLikes = pgTable("gpt_ideas_likes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	gptIdeaId: bigint("gpt_idea_id", { mode: "number" }).notNull(),
	profileId: uuid("profile_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.gptIdeaId],
			foreignColumns: [gptIdeas.gptIdeaId],
			name: "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "gpt_ideas_likes_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.gptIdeaId, table.profileId], name: "gpt_ideas_likes_gpt_idea_id_profile_id_pk"}),
]);

export const messageRoomMembers = pgTable("message_room_members", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	messageRoomId: bigint("message_room_id", { mode: "number" }).notNull(),
	profileId: uuid("profile_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.messageRoomId],
			foreignColumns: [messageRooms.messageRoomId],
			name: "message_room_members_message_room_id_message_rooms_message_room"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "message_room_members_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.messageRoomId, table.profileId], name: "message_room_members_message_room_id_profile_id_pk"}),
]);

export const productUpvotes = pgTable("product_upvotes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }).notNull(),
	profileId: uuid("profile_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "product_upvotes_product_id_products_product_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.profileId],
			foreignColumns: [profiles.profileId],
			name: "product_upvotes_profile_id_profiles_profile_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.productId, table.profileId], name: "product_upvotes_product_id_profile_id_pk"}),
]);
export const communityPostListView = pgView("community_post_list_view", {	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	title: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	topic: text(),
	author: text(),
	authorAvatar: text("author_avatar"),
	authorUsername: text("author_username"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	upvotes: bigint({ mode: "number" }),
	topicSlug: text("topic_slug"),
}).as(sql`SELECT posts.post_id, posts.title, posts.created_at, topics.name AS topic, profiles.name AS author, profiles.avatar AS author_avatar, profiles.username AS author_username, posts.upvotes, topics.slug AS topic_slug FROM posts JOIN topics USING (topic_id) JOIN profiles USING (profile_id)`);

export const gptIdeasView = pgView("gpt_ideas_view", {	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	gptIdeaId: bigint("gpt_idea_id", { mode: "number" }),
	idea: text(),
	views: integer(),
	isClaimed: boolean("is_claimed"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	likes: bigint({ mode: "number" }),
	createdAt: timestamp("created_at", { mode: 'string' }),
}).as(sql`SELECT gpt_ideas.gpt_idea_id, gpt_ideas.idea, gpt_ideas.views, CASE WHEN gpt_ideas.claimed_at IS NULL THEN false ELSE true END AS is_claimed, count(gpt_ideas_likes.gpt_idea_id) AS likes, gpt_ideas.created_at FROM gpt_ideas LEFT JOIN gpt_ideas_likes USING (gpt_idea_id) GROUP BY gpt_ideas.gpt_idea_id`);