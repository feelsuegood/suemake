import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "./constans";

export const jobType = pgEnum(
  "job_type",
  JOB_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const locations = pgEnum(
  "location",
  LOCATION_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const salaryRange = pgEnum(
  "salary_range",
  SALARY_RANGES as [string, ...string[]],
);

export const jobs = pgTable("jobs", {
  job_id: bigint("job_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  position: text().notNull(),
  overview: text().notNull(),
  responsibilities: text().notNull(),
  qualifications: text().notNull(),
  benefits: text().notNull(),
  skills: text().notNull(),
  company_name: text().notNull(),
  company_logo: text().notNull(),
  company_location: text().notNull(),
  apply_url: text().notNull(),
  job_type: jobType().notNull(),
  location: locations().notNull(),
  salary_range: salaryRange().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
