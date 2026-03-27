// src\features\registry\service\registryService.ts
import type { Registry } from "../types/registry.types";
import type { CreateSale } from "@/features/sales/types/sales.types";
import { salesService } from "@/features/sales/service/sales.service";

export const buildSaleFromRegistry = (
	rows: Registry[],
	total: number,
): CreateSale | null => {
	const validRows = rows.filter(
		(row) => row.productId && row.quantity > 0 && row.price > 0,
	);

	if (validRows.length === 0) return null;

	const items = validRows.map((row) => ({
		productId: row.productId!,
		quantity: row.quantity,
		price: row.price,
	}));

	return {
		total,
		items,
	};
};

export const submitRegistrySale = async (
	rows: Registry[],
	total: number,
): Promise<boolean> => {
	const sale = buildSaleFromRegistry(rows, total);

	if (!sale) return false;

	await salesService.create(sale);

	return true;
};
