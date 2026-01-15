import {
  bigint,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const productStage = pgEnum(
  "product_stage",
  PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]
);

export const team = pgTable(
  "teams",
  {
    team_id: bigint("team_id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_name: text().notNull(),
    product_stage: productStage().notNull(),
    team_size: integer().notNull(),
    equity_split: integer().notNull(),
    roles: text("roles").notNull(),
    product_description: text().notNull(),
    team_leader_id: uuid()
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      })
      .notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  // constraints is an array and it was an object in the previous version
  (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
    check(
      "product_description_check",
      sql`LENGTH(${table.product_description})<= 200`
    ),
  ]
);
