import { and, count, desc, eq, gte, type InferInsertModel } from "drizzle-orm";

import { generations } from "@/db/schema";
import { db } from "@/db/index";

/** Start of current month (UTC), used for monthly generation quotas. */
export function utcMonthStart() {
	const n = new Date();
	return new Date(
		Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1, 0, 0, 0, 0),
	);
}

export async function countGenerationsSince(clerkUserId: string, since: Date) {
	// Counting the number of generations based on the date
	const [row] = await db
		.select({ c: count() })
		.from(generations)
		.where(
			and(
				eq(generations.clerkUserId, clerkUserId),
				gte(generations.createdAt, since),
			),
		);

	return Number(row?.c ?? 0);
}

export async function listUserGenerationSummaries(clerkUserId: string) {
	// Lists the user history of generations
	return db
		.select()
		.from(generations)
		.where(eq(generations.clerkUserId, clerkUserId))
		.orderBy(desc(generations.createdAt)); // from the latest -> oldest sorting
}

// Type of the generated object
type InsertGenerationInput = Omit<
	InferInsertModel<typeof generations>,
	"id" | "createdAt"
>;

// Saves the generated object into the DB and inserts them in the array of generations
export async function createGeneration(input: InsertGenerationInput) {
	const [row] = await db.insert(generations).values(input).returning();

	return row;
}
