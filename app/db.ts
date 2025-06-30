import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client);
// if you want to see the queries in the console
// const db = drizzle(client, { logger: true });

export default db;
