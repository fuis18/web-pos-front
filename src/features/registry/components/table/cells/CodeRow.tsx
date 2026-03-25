// src/features/registry/components/table/CodeRow.tsx
import { Input } from "@/components/ui/input";
import { getProductByCode } from "@/features/products/repository/products.repository";
import type { Registry } from "@/features/registry/types/registry.types";
import type { CellContext } from "@tanstack/react-table";
import useFocusableCell from "../hooks/useFocusableCell";

export default function CodeCell({
	row,
	table,
	getValue,
}: CellContext<Registry, unknown>) {
	const meta = table.options.meta;
	const value = (getValue() as string) ?? "";

	const ref = useFocusableCell({
		rowIndex: row.index,
		column: "code",
		focus: meta?.focus?.focus ?? null,
	});

	return (
		<Input
			value={value}
			ref={ref}
			onChange={(e) => {
				meta?.updateCell?.(row.index, "code", e.target.value);
			}}
			onKeyDown={async (e) => {
				if (e.key === "Enter") e.preventDefault();

				if (e.key === "Enter" || e.key === "Tab") {
					const inputValue = (e.target as HTMLInputElement).value;

					if (e.key === "Enter" && inputValue === "") {
						const hasValidRows = table
							.getRowModel()
							.rows.some(
								(r) => r.original.product_id !== null && r.index !== row.index,
							);

						if (hasValidRows) {
							// Enviar el registro
							meta?.submit?.();
							return;
						}

						// Si no hay filas válidas, no hacer nada
						return;
					}
					const code = Number(inputValue);
					if (Number.isNaN(code)) return;

					const product = await getProductByCode(code);

					if (!product) return;

					meta?.upsertProduct?.(row.index, product, e.key === "Enter");
				}
			}}
		/>
	);
}
