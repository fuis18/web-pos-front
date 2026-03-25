import type { Registry } from "./registry.types";

export interface SubmitRegistryParams {
	data: Registry[];
	total: number;
}

export interface SubmitRegistryResult {
	success: boolean;
	message?: string;
}

export type SubmitRegistryFn = (
	params: SubmitRegistryParams,
) => Promise<SubmitRegistryResult>;
