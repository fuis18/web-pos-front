import * as repo from "../api/products.api";
import type { CreateProduct, UpdateProduct } from "../types/products.types";

export const productService = {
	async findByCode(code: number) {
		return repo.getProductByCode(code);
	},

	async findByName(name: string) {
		return repo.getProductByName(name);
	},

	async findByLike(name: string) {
		if (!name.trim()) return [];
		return repo.getProductByLike(name);
	},

	async findAll(limit: number, offset: number, user: boolean) {
		return repo.findAllPaginated(limit, offset, !user);
	},

	async exportAll() {
		return repo.getAllProductsForExport();
	},

	async reactive(id: number) {
		return repo.reactivateProduct(id);
	},

	async softDelete(id: number) {
		return repo.softDeleteProduct(id);
	},

	async hardDelete(id: number) {
		return repo.hardDeleteProduct(id);
	},

	async softDeleteBatch(ids: number[]) {
		return repo.softDeleteProducts(ids);
	},

	async reactiveBatch(ids: number[]) {
		return repo.reactivateProducts(ids);
	},

	async hardDeleteBatch(ids: number[]) {
		return repo.hardDeleteProducts(ids);
	},

	async create(product: CreateProduct) {
		return repo.createProduct(product);
	},

	async update(id: number, product: UpdateProduct) {
		return repo.updateProduct(id, product);
	},
};
