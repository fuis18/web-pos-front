async function request<T>(
	method: string,
	url: string,
	body?: object,
): Promise<T> {
	console.log("3.4");
	const fullUrl = `${import.meta.env.VITE_API_URL}${url}`;
	console.log(fullUrl);
	const res = await fetch(fullUrl, {
		method,
		headers: body !== undefined ? { "Content-Type": "application/json" } : {},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	console.log("3.5");

	if (!res.ok) {
		const text = await res.text();
		console.error(`[api] ERROR ${res.status}:`, text.slice(0, 200));
		throw new Error(`API ${res.status}: ${text}`);
	}

	console.log("3.8");

	const text = await res.text();
	console.log(text);
	return JSON.parse(text) as T;
}

function toQuery(params: Record<string, string | undefined>): string {
	const qs = new URLSearchParams();
	for (const [k, v] of Object.entries(params)) {
		if (v !== undefined) qs.append(k, v);
	}
	const str = qs.toString();
	return str ? `?${str}` : "";
}

export const api = {
	get<T>(url: string, params?: Record<string, string | undefined>): Promise<T> {
		return request<T>("GET", url + toQuery(params ?? {}));
	},
	post<T>(url: string, body?: object): Promise<T> {
		console.log("3.2");
		console.log(url, body);
		return request<T>("POST", url, body);
	},
	patch<T>(url: string, body?: object): Promise<T> {
		return request<T>("PATCH", url, body);
	},
	delete<T>(url: string, body?: object): Promise<T> {
		return request<T>("DELETE", url, body);
	},
};
