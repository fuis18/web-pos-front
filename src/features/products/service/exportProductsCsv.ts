import { getAllProductsForExport } from "../api/products.api";
import { saveFileAs } from "@/lib/saveFile";

export async function exportProductsCsv(): Promise<string | null> {
	const products = await getAllProductsForExport();

	const { default: Papa } = await import("papaparse");
	const csv = Papa.unparse(products, {
		columns: ["id", "code", "name", "price"],
	});

	return saveFileAs({
		defaultName: "productos.csv",
		filters: [{ name: "CSV", extensions: ["csv"] }],
		content: new TextEncoder().encode(csv),
	});
}
