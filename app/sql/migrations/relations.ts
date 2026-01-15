import { relations } from "drizzle-orm/relations";
import { profiles, follows, gptIdeas, posts, notifications, products, messageRooms, messages, postReplies, topics, usersInAuth, categories, reviews, postUpvotes, gptIdeasLikes, messageRoomMembers, productUpvotes } from "./schema";

export const followsRelations = relations(follows, ({one}) => ({
	profile_followerId: one(profiles, {
		fields: [follows.followerId],
		references: [profiles.profileId],
		relationName: "follows_followerId_profiles_profileId"
	}),
	profile_followingId: one(profiles, {
		fields: [follows.followingId],
		references: [profiles.profileId],
		relationName: "follows_followingId_profiles_profileId"
	}),
}));

export const profilesRelations = relations(profiles, ({one, many}) => ({
	follows_followerId: many(follows, {
		relationName: "follows_followerId_profiles_profileId"
	}),
	follows_followingId: many(follows, {
		relationName: "follows_followingId_profiles_profileId"
	}),
	gptIdeas: many(gptIdeas),
	notifications_sourceId: many(notifications, {
		relationName: "notifications_sourceId_profiles_profileId"
	}),
	notifications_targetId: many(notifications, {
		relationName: "notifications_targetId_profiles_profileId"
	}),
	messages: many(messages),
	postReplies: many(postReplies),
	posts: many(posts),
	usersInAuth: one(usersInAuth, {
		fields: [profiles.profileId],
		references: [usersInAuth.id]
	}),
	products: many(products),
	reviews: many(reviews),
	postUpvotes: many(postUpvotes),
	gptIdeasLikes: many(gptIdeasLikes),
	messageRoomMembers: many(messageRoomMembers),
	productUpvotes: many(productUpvotes),
}));

export const gptIdeasRelations = relations(gptIdeas, ({one, many}) => ({
	profile: one(profiles, {
		fields: [gptIdeas.claimedBy],
		references: [profiles.profileId]
	}),
	gptIdeasLikes: many(gptIdeasLikes),
}));

export const notificationsRelations = relations(notifications, ({one}) => ({
	post: one(posts, {
		fields: [notifications.postId],
		references: [posts.postId]
	}),
	product: one(products, {
		fields: [notifications.productId],
		references: [products.productId]
	}),
	profile_sourceId: one(profiles, {
		fields: [notifications.sourceId],
		references: [profiles.profileId],
		relationName: "notifications_sourceId_profiles_profileId"
	}),
	profile_targetId: one(profiles, {
		fields: [notifications.targetId],
		references: [profiles.profileId],
		relationName: "notifications_targetId_profiles_profileId"
	}),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	notifications: many(notifications),
	postReplies: many(postReplies),
	profile: one(profiles, {
		fields: [posts.profileId],
		references: [profiles.profileId]
	}),
	topic: one(topics, {
		fields: [posts.topicId],
		references: [topics.topicId]
	}),
	postUpvotes: many(postUpvotes),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	notifications: many(notifications),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.categoryId]
	}),
	profile: one(profiles, {
		fields: [products.profileId],
		references: [profiles.profileId]
	}),
	reviews: many(reviews),
	productUpvotes: many(productUpvotes),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	messageRoom: one(messageRooms, {
		fields: [messages.messageRoomId],
		references: [messageRooms.messageRoomId]
	}),
	profile: one(profiles, {
		fields: [messages.senderId],
		references: [profiles.profileId]
	}),
}));

export const messageRoomsRelations = relations(messageRooms, ({many}) => ({
	messages: many(messages),
	messageRoomMembers: many(messageRoomMembers),
}));

export const postRepliesRelations = relations(postReplies, ({one, many}) => ({
	postReply: one(postReplies, {
		fields: [postReplies.parentId],
		references: [postReplies.replyId],
		relationName: "postReplies_parentId_postReplies_replyId"
	}),
	postReplies: many(postReplies, {
		relationName: "postReplies_parentId_postReplies_replyId"
	}),
	post: one(posts, {
		fields: [postReplies.postId],
		references: [posts.postId]
	}),
	profile: one(profiles, {
		fields: [postReplies.profileId],
		references: [profiles.profileId]
	}),
}));

export const topicsRelations = relations(topics, ({many}) => ({
	posts: many(posts),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	profiles: many(profiles),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	product: one(products, {
		fields: [reviews.productId],
		references: [products.productId]
	}),
	profile: one(profiles, {
		fields: [reviews.profileId],
		references: [profiles.profileId]
	}),
}));

export const postUpvotesRelations = relations(postUpvotes, ({one}) => ({
	post: one(posts, {
		fields: [postUpvotes.postId],
		references: [posts.postId]
	}),
	profile: one(profiles, {
		fields: [postUpvotes.profileId],
		references: [profiles.profileId]
	}),
}));

export const gptIdeasLikesRelations = relations(gptIdeasLikes, ({one}) => ({
	gptIdea: one(gptIdeas, {
		fields: [gptIdeasLikes.gptIdeaId],
		references: [gptIdeas.gptIdeaId]
	}),
	profile: one(profiles, {
		fields: [gptIdeasLikes.profileId],
		references: [profiles.profileId]
	}),
}));

export const messageRoomMembersRelations = relations(messageRoomMembers, ({one}) => ({
	messageRoom: one(messageRooms, {
		fields: [messageRoomMembers.messageRoomId],
		references: [messageRooms.messageRoomId]
	}),
	profile: one(profiles, {
		fields: [messageRoomMembers.profileId],
		references: [profiles.profileId]
	}),
}));

export const productUpvotesRelations = relations(productUpvotes, ({one}) => ({
	product: one(products, {
		fields: [productUpvotes.productId],
		references: [products.productId]
	}),
	profile: one(profiles, {
		fields: [productUpvotes.profileId],
		references: [profiles.profileId]
	}),
}));