import {
  bigint,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const gptIdeas = pgTable("gpt_ideas", {
  gpt_idea_id: bigint("gpt_idea_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  idea: text().notNull(),
  views: integer().notNull().default(0),
  claimed: timestamp(),
  claimed_by: uuid().references(() => profiles.profile_id, {
    onDelete: "set null",
  }),
  created_at: timestamp().notNull().defaultNow(),
});

export const gptIdeasLikes = pgTable(
  "gpt_ideas_likes",
  {
    gpt_idea_id: bigint("gpt_idea_id", { mode: "number" }).references(
      () => gptIdeas.gpt_idea_id,
      {
        onDelete: "cascade",
      },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.gpt_idea_id, table.profile_id] })],
);
