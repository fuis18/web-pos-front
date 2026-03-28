import type { ImportRow } from "../api/products.api";
import type { RawProductRow } from "./parseProductsFile";
import { z } from "zod";

const importRowSchema = z.object({
	code: z.number(),
	name: z.string(),
	price: z.number(),
});

export function mapToImportRows(rows: RawProductRow[]): ImportRow[] {
	return rows.map((row, index) => {
		const code = Number(row.code ?? row.codigo);
		const name = row.name ?? row.nombre;
		const price = Number(row.price ?? row.precio);

		if (!code || !name || !price) {
			throw new Error(`Fila inválida en la línea ${index + 1}`);
		}

		return importRowSchema.parse({
			code,
			name,
			price,
		});
	});
}
