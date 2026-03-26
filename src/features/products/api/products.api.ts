import { api } from "@/lib/api";
import type {
	CreateProduct,
	Product,
	ProductListItem,
	UpdateProduct,
} from "../types/products.types";

export const getProductByCode = (code: number) =>
	api.get<ProductListItem | null>(`/products/search/code/${code}`);

export const getProductByName = (name: string) =>
	api.get<ProductListItem | null>("/products/search/name", { q: name });

export const getProductByLike = (name: string) =>
	api.get<ProductListItem[]>("/products/search/like", { q: name });

export const findAllPaginated = (
	limit: number,
	offset: number,
	activeOnly: boolean,
) =>
	api.get<{ data: Product[]; total: number }>("/products", {
		limit: String(limit),
		offset: String(offset),
		activeOnly: String(activeOnly),
	});

export const getAllProductsForExport = () =>
	api.get<ProductListItem[]>("/products/export");

export const createProduct = async (product: CreateProduct) => {
	const res = await api.post<{ id: number }>("/products", product);
	return res.id;
};

export const updateProduct = (id: number, product: UpdateProduct) =>
	api.patch<void>(`/products/${id}`, product);

export const softDeleteProduct = (id: number) =>
	api.patch<void>(`/products/${id}/soft-delete`);

export const reactivateProduct = (id: number) =>
	api.patch<void>(`/products/${id}/reactivate`);

export const hardDeleteProduct = (id: number) =>
	api.delete<void>(`/products/${id}`);

/* ---------- Batch ---------- */

export const softDeleteProducts = (ids: number[]) =>
	ids.length
		? api.patch<void>("/products/batch/soft-delete", { ids })
		: Promise.resolve();

export const reactivateProducts = (ids: number[]) =>
	ids.length
		? api.patch<void>("/products/batch/reactivate", { ids })
		: Promise.resolve();

export const hardDeleteProducts = (ids: number[]) =>
	ids.length ? api.delete<void>("/products/batch", { ids }) : Promise.resolve();
