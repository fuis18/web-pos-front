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

const dateParams = (date?: DateFilter): Record<string, string | undefined> =>
	date
		? {
				from: date.from,
				to: date.to,
				timeFrom: date.timeFrom,
				timeTo: date.timeTo,
			}
		: {};

export const getAllSales = async (
	limit: number,
	offset: number,
	date?: DateFilter,
) => {
	const res = await api.get<{ data: Sale[]; total: number }>("/sales", {
		limit: String(limit),
		offset: String(offset),
		...dateParams(date),
	});
	return res.data;
};

export const getSaleItems = (saleId: number) =>
	api.get<SaleItem[]>(`/sales/${saleId}/items`);

export const getSalesCount = async (date?: DateFilter) => {
	const res = await api.get<{ data: Sale[]; total: number }>("/sales", {
		limit: "1",
		offset: "0",
		...dateParams(date),
	});
	return res.total;
};

export const getSalesTotal = (date?: DateFilter) =>
	api.get<number>("/sales/total", { ...dateParams(date) });

export const getAllSalesForExport = (date?: DateFilter) =>
	api.get<Sale[]>("/sales/export", { ...dateParams(date) });

export const getAllSaleItemsForExport = (date?: DateFilter) =>
	api.get<SaleItem[]>("/sales/export/items", { ...dateParams(date) });

export const createSale = async (sale: CreateSale) => {
	const res = await api.post<{ id: number }>("/sales", sale);
	return res.id;
};

export const createSaleReport = async (saleId: number, reason: string) => {
	const res = await api.post<{ id: number }>(`/sales/${saleId}/report`, {
		reason,
	});
	return res.id;
};

export const getReportedSaleIds = async () => {
	const ids = await api.get<number[]>("/sales/reported");
	return new Set(ids);
};

export const getSaleReport = (saleId: number) =>
	api.get<SaleReport | null>(`/sales/${saleId}/report`);

export const cancelSaleReport = (saleId: number) =>
	api.delete<void>(`/sales/${saleId}/report`);

export const deleteSale = (saleId: number) =>
	api.delete<void>(`/sales/${saleId}`);
