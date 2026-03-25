import type { Product } from "@/features/products/types/products.types";
import type { CellContext } from "@tanstack/react-table";

export default function StateCell({ getValue }: CellContext<Product, unknown>) {
	const active = getValue<boolean | number>();
	return (
		<span
			className={
				active ? "text-green-600 font-medium" : "text-red-600 font-medium"
			}
		>
			{active ? "Activo" : "Inactivo"}
		</span>
	);
}
