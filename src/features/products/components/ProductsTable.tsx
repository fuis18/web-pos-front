"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import useProductsTable from "./table/hooks/useProductsTable";
import type { ProductsTableProps } from "../types/products.types";

const ProductsTable = ({
	data,
	meta,
	onSelectionChange,
}: ProductsTableProps) => {
	"use no memo";
	console.log("[ProductsTable] render, data:", data);
	const table = useProductsTable({ data, meta, onSelectionChange });
	console.log(
		"[ProductsTable] rows:",
		table.getRowModel().rows.length,
		table.getRowModel().rows,
	);

	return (
		<Table className="ProductsTable">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id} className="ProductsTable-row">
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
							className="ProductsTable-row"
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={table.getAllColumns().length}
							className="h-24 text-center"
						>
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default ProductsTable;
