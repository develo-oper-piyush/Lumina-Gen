import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

function getDb() {
	const databaseURL = process.env.DATABASE_URL;
	if (!databaseURL) throw new Error("Missing DATABASE_URL environment variable. Add it in your Vercel project settings.");
	const sql = neon(databaseURL);
	return drizzle({ client: sql, schema });
}

export const db = new Proxy({} as ReturnType<typeof getDb>, {
	get(_target, prop) {
		return getDb()[prop as keyof ReturnType<typeof getDb>];
	},
});
