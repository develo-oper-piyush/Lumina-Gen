import { countGenerationsSince, utcMonthStart } from "@/db/generations";

import type { SessionAuthObject } from "@clerk/backend";

// Type of Generation object
export type GenerationQuotaSnapshot = {
	limit: number;
	used: number;
	remaining: number;
};

// Type object for Billing plans
export const BILLING_PLAN_KEYS = {
	free: "free",
	pro: "pro",
	studio: "studio",
} as const;

// Type object for limits of generations
export const MONTHLY_GENERATION_LIMITS = {
	free: 1,
	pro: 90,
	studio: 190,
} as const;

// This functions is going to check which plan is user subscribed to and will return that number of limits
export function getMonthlyGenerationLimit(
	has: SessionAuthObject["has"],
): number {
	// User subscribed to 100 limit
	if (has({ plan: BILLING_PLAN_KEYS.studio })) {
		return MONTHLY_GENERATION_LIMITS.studio;
	}
	// User subscribed to 50 limit
	if (has({ plan: BILLING_PLAN_KEYS.pro })) {
		return MONTHLY_GENERATION_LIMITS.pro;
	}
	// User has only 10 limit
	return MONTHLY_GENERATION_LIMITS.free;
}

// This is the function for getting the generations quota object type created above
export async function getGenerationQuotaSnapshot(
	has: SessionAuthObject["has"],
	clerkUserId: string,
) {
	const limit = getMonthlyGenerationLimit(has);
	const used = await countGenerationsSince(clerkUserId, utcMonthStart());
	return {
		limit,
		used,
		remaining: Math.max(0, limit - used),
	};
}
