import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const databaseURL = process.env.DATABASE_URL;

if (!databaseURL) throw new Error("Missing DATABASE_URL");

const sql = neon(databaseURL);

export const db = drizzle({ client: sql, schema });
