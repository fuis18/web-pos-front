import { Input } from "@/components/ui/input";
import type { Registry } from "@/features/registry/types/registry.types";
import type { CellContext } from "@tanstack/react-table";

export default function QuantityCell({
	row,
	table,
	getValue,
}: CellContext<Registry, unknown>) {
	const meta = table.options.meta;
	const value = (getValue() as string) ?? "";

	return (
		<Input
			type="number"
			value={value}
			min="0"
			onChange={(e) => {
				meta?.updateCell?.(row.index, "quantity", Number(e.target.value));
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					meta?.addRow?.();
				}
			}}
		/>
	);
}
