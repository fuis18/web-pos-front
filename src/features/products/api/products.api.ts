import { api } from "@/lib/api";
import type {
	CreateProduct,
	Product,
	ProductListItem,
	UpdateProduct,
} from "../types/products.types";

// GET /products/search/code/:code
export async function getProductByCode(
	code: number,
): Promise<ProductListItem | null> {
	return api.get<ProductListItem | null>(`/products/search/code/${code}`);
}

// GET /products/search/name?q=
export async function getProductByName(
	name: string,
): Promise<ProductListItem | null> {
	return api.get<ProductListItem | null>("/products/search/name", { q: name });
}

// GET /products/search/like?q=
export async function getProductByLike(
	name: string,
): Promise<ProductListItem[]> {
	return api.get<ProductListItem[]>("/products/search/like", { q: name });
}

// GET /products?limit=&offset=&activeOnly=false
export async function getAllProducts(
	limit: number,
	offset: number,
): Promise<Product[]> {
	const res = await api.get<{ data: Product[]; total: number }>("/products", {
		limit: String(limit),
		offset: String(offset),
		activeOnly: "false",
	});
	return res.data;
}

// GET /products?limit=&offset=&activeOnly= → { data, total } in one call
export async function findAllPaginated(
	limit: number,
	offset: number,
	activeOnly: boolean,
): Promise<{ data: Product[]; total: number }> {
	return api.get<{ data: Product[]; total: number }>("/products", {
		limit: String(limit),
		offset: String(offset),
		activeOnly: String(activeOnly),
	});
}

// GET /products/export
export async function getAllProductsForExport(): Promise<ProductListItem[]> {
	return api.get<ProductListItem[]>("/products/export");
}

// GET /products?limit=1&offset=0&activeOnly=false → total
export async function getProductsCount(): Promise<number> {
	const res = await api.get<{ data: Product[]; total: number }>("/products", {
		limit: "1",
		offset: "0",
		activeOnly: "false",
	});
	return res.total;
}

// GET /products?limit=&offset=&activeOnly=true
export async function getAllProductsActive(
	limit: number,
	offset: number,
): Promise<Product[]> {
	const res = await api.get<{ data: Product[]; total: number }>("/products", {
		limit: String(limit),
		offset: String(offset),
		activeOnly: "true",
	});
	return res.data;
}

// GET /products?limit=1&offset=0&activeOnly=true → total
export async function getProductsCountActive(): Promise<number> {
	const res = await api.get<{ data: Product[]; total: number }>("/products", {
		limit: "1",
		offset: "0",
		activeOnly: "true",
	});
	return res.total;
}

// POST /products
export async function createProduct(product: CreateProduct): Promise<number> {
	const res = await api.post<{ id: number }>("/products", product);
	return res.id;
}

// PATCH /products/:id
export async function updateProduct(
	id: number,
	product: UpdateProduct,
): Promise<void> {
	await api.patch(`/products/${id}`, product);
}

// PATCH /products/:id/soft-delete
export async function softDeleteProduct(id: number): Promise<void> {
	await api.patch(`/products/${id}/soft-delete`);
}

// PATCH /products/:id/reactivate
export async function reactivateProduct(id: number): Promise<void> {
	await api.patch(`/products/${id}/reactivate`);
}

// DELETE /products/:id
export async function hardDeleteProduct(id: number): Promise<void> {
	await api.delete(`/products/${id}`);
}

/* ---------- Batch operations ---------- */

// PATCH /products/batch/soft-delete
export async function softDeleteProducts(ids: number[]): Promise<void> {
	if (!ids.length) return;
	await api.patch("/products/batch/soft-delete", { ids });
}

// PATCH /products/batch/reactivate
export async function reactivateProducts(ids: number[]): Promise<void> {
	if (!ids.length) return;
	await api.patch("/products/batch/reactivate", { ids });
}

// DELETE /products/batch
export async function hardDeleteProducts(ids: number[]): Promise<void> {
	if (!ids.length) return;
	await api.delete("/products/batch", { ids });
}
