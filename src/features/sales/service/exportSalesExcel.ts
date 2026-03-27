import {
	getAllSaleItemsForExport,
	getAllSalesForExport,
} from "../api/sales.api";
import { saveFileAs } from "@/lib/saveFile";

export async function exportSalesExcel(date?: {
	from?: string;
	to?: string;
	timeFrom?: string;
	timeTo?: string;
}): Promise<string | null> {
	const [sales, items] = await Promise.all([
		getAllSalesForExport(date),
		getAllSaleItemsForExport(date),
	]);

	const XLSX = await import("xlsx");
	const workbook = XLSX.utils.book_new();

	const salesSheet = XLSX.utils.json_to_sheet(sales, {
		header: ["id", "date", "total"],
	});
	XLSX.utils.book_append_sheet(workbook, salesSheet, "Sales");

	const itemsSheet = XLSX.utils.json_to_sheet(items, {
		header: [
			"id",
			"saleId",
			"productId",
			"code",
			"name",
			"quantity",
			"priceAtSale",
		],
	});
	XLSX.utils.book_append_sheet(workbook, itemsSheet, "SaleItems");

	const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

	return saveFileAs({
		defaultName: "ventas.xlsx",
		filters: [{ name: "Excel", extensions: ["xlsx"] }],
		content: new Uint8Array(buffer),
	});
}
