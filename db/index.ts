import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// 1. Create the Pool with SSL settings
const pool = new Pool({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT)!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 2. Export the db instance
export const db = drizzle(pool, { schema });
