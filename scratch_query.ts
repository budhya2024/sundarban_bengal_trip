import fs from "fs";
import { parse } from "dotenv";
const envConfig = parse(fs.readFileSync(".env.local"));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

import { db } from "./db";
import { blogs } from "./db/schema";

async function main() {
  const b = await db.select().from(blogs);
  console.log("DB Blogs:", b.map(x => ({ slug: x.slug, image: x.image })));
  process.exit(0);
}
main();
