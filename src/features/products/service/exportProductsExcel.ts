import { getAllProductsForExport } from "../api/products.api";
import { saveFileAs } from "@/lib/saveFile";

export async function exportProductsExcel(): Promise<string | null> {
	const products = await getAllProductsForExport();

	const XLSX = await import("xlsx");
	const worksheet = XLSX.utils.json_to_sheet(products, {
		header: ["id", "code", "name", "price"],
	});
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

	const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

	return saveFileAs({
		defaultName: "productos.xlsx",
		filters: [{ name: "Excel", extensions: ["xlsx"] }],
		content: new Uint8Array(buffer),
	});
}
