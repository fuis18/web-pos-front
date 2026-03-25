import { api } from "@/lib/api";
import type {
	CreateSale,
	Sale,
	SaleItem,
	SaleReport,
} from "../types/sales.types";

type DateFilter = {
	from?: string;
	to?: string;
	timeFrom?: string;
	timeTo?: string;
};

function dateParams(date?: DateFilter): Record<string, string | undefined> {
	if (!date) return {};
	return {
		from: date.from,
		to: date.to,
		timeFrom: date.timeFrom,
		timeTo: date.timeTo,
	};
}

// GET /sales?limit=&offset=&from=&to=&timeFrom=&timeTo=
export async function getAllSales(
	limit: number,
	offset: number,
	date?: DateFilter,
): Promise<Sale[]> {
	const res = await api.get<{ data: Sale[]; total: number }>("/sales", {
		limit: String(limit),
		offset: String(offset),
		...dateParams(date),
	});
	return res.data;
}

// GET /sales/:id/items
export async function getSaleItems(saleId: number): Promise<SaleItem[]> {
	return api.get<SaleItem[]>(`/sales/${saleId}/items`);
}

// GET /sales?limit=1&offset=0 → total
export async function getSalesCount(date?: DateFilter): Promise<number> {
	const res = await api.get<{ data: Sale[]; total: number }>("/sales", {
		limit: "1",
		offset: "0",
		...dateParams(date),
	});
	return res.total;
}

// GET /sales/total
export async function getSalesTotal(date?: DateFilter): Promise<number> {
	return api.get<number>("/sales/total", { ...dateParams(date) });
}

// GET /sales/export
export async function getAllSalesForExport(date?: DateFilter): Promise<Sale[]> {
	return api.get<Sale[]>("/sales/export", { ...dateParams(date) });
}

// GET /sales/export/items
export async function getAllSaleItemsForExport(
	date?: DateFilter,
): Promise<SaleItem[]> {
	return api.get<SaleItem[]>("/sales/export/items", { ...dateParams(date) });
}

// POST /sales
export async function createSale(sale: CreateSale): Promise<number> {
	const res = await api.post<{ id: number }>("/sales", sale);
	return res.id;
}

// POST /sales/:id/report
export async function createSaleReport(
	saleId: number,
	reason: string,
): Promise<number> {
	const res = await api.post<{ id: number }>(`/sales/${saleId}/report`, {
		reason,
	});
	return res.id;
}

// GET /sales/reported
export async function getReportedSaleIds(): Promise<Set<number>> {
	const ids = await api.get<number[]>("/sales/reported");
	return new Set(ids);
}

// GET /sales/:id/report
export async function getSaleReport(
	saleId: number,
): Promise<SaleReport | null> {
	return api.get<SaleReport | null>(`/sales/${saleId}/report`);
}

// DELETE /sales/:id/report
export async function cancelSaleReport(saleId: number): Promise<void> {
	await api.delete(`/sales/${saleId}/report`);
}

// DELETE /sales/:id
export async function deleteSale(saleId: number): Promise<void> {
	await api.delete(`/sales/${saleId}`);
}
