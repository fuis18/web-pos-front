async function request<T>(
	method: string,
	url: string,
	body?: object,
): Promise<T> {
	//TODO: Configurar bien en env
	const fullUrl = `http://web-pos-backend-vxrrd4-1172b8-144-225-147-25.traefik.me${url}`;
	const res = await fetch(fullUrl, {
		method,
		headers: body !== undefined ? { "Content-Type": "application/json" } : {},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (!res.ok) {
		const text = await res.text();
		console.error(`[api] ERROR ${res.status}:`, text.slice(0, 200));
		throw new Error(`API ${res.status}: ${text}`);
	}

	const text = await res.text();
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
		return request<T>("POST", url, body);
	},
	patch<T>(url: string, body?: object): Promise<T> {
		return request<T>("PATCH", url, body);
	},
	delete<T>(url: string, body?: object): Promise<T> {
		return request<T>("DELETE", url, body);
	},
};
