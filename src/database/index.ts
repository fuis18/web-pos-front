import { apiPost } from "./db";

export type DbParam = string | number | null;

export async function select<T>(
	query: string,
	params: DbParam[] = [],
): Promise<T[]> {
	const { rows } = await apiPost<{ rows: T[] }>("/query", { query, params });
	return rows;
}

export async function insert(
	query: string,
	params: DbParam[] = [],
): Promise<number> {
	const { lastInsertId } = await apiPost<{ lastInsertId: number }>("/execute", {
		query,
		params,
	});
	return lastInsertId;
}

export async function execute(
	query: string,
	params: DbParam[] = [],
): Promise<void> {
	await apiPost("/execute", { query, params });
}
