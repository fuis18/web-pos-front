// src/features/registry/types.ts
import type { TableMeta } from "@tanstack/react-table";

export interface Registry {
	id: number;
	productId?: number;
	code: string;
	quantity: number;
	name: string;
	price: number;
	total: number;
}

export interface RegistryTableProps {
	data: Registry[];
	meta?: TableMeta<Registry>;
	onSelectionChange?: (rows: Registry[]) => void;
}
