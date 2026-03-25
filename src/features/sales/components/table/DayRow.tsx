import type { Sale } from "@/features/sales/types/sales.types";
import type { CellContext } from "@tanstack/react-table";
import { toLocalDay } from "@/lib/date";

export default function DayCell({ row }: CellContext<Sale, unknown>) {
	return <span>{toLocalDay(row.original.date)}</span>;
}
