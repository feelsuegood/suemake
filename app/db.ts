import postgres from "postgres";
import { drizzle } from "drizzle-orm/node-postgres";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client);

export default db;