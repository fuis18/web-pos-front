import { CONFIG } from "@/constants/config";

const API_BASE = CONFIG.API_BASE;

export async function apiPost<T>(
	endpoint: string,
	body: Record<string, unknown>,
): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`API error ${res.status}: ${text}`);
	}

	return res.json() as Promise<T>;
}
