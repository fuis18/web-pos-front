// src/features/sales/types/sales.types.ts
import type { ColumnDef } from "@tanstack/react-table";

export interface Sale {
	id: number;
	date: string;
	total: number;
}

export interface CreateSaleItem {
	productId: number;
	quantity: number;
	price: number;
}

export interface CreateSale {
	total: number;
	items: CreateSaleItem[];
}

export interface SaleItem {
	id: number;
	saleId: number;
	productId: number;
	quantity: number;
	priceAtSale: number;
	name?: string;
	code?: string;
}

export interface SaleReport {
	id: number;
	saleId: number;
	reason: string;
	reportedAt: string;
}

export interface SalesTableProps {
	data: Sale[];
	columns: ColumnDef<Sale>[];
	meta?: Record<string, unknown>;
	onRowClick?: (saleId: number) => void;
	reportedSaleIds?: Set<number>;
}
