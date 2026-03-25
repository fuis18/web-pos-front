import {
	useReactTable,
	getCoreRowModel,
	type RowSelectionState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { columns } from "../registry-columns";
import type { RegistryTableProps } from "@/features/registry/types/registry.types";

const useRegistryTable = ({
	data,
	meta,
	onSelectionChange,
}: RegistryTableProps) => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		meta,
		state: { rowSelection },
		onRowSelectionChange: setRowSelection,
		getRowId: (row) => String(row.id),
		enableRowSelection: (row) => row.original.id !== data.length - 1,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		setRowSelection({});
	}, [data]);

	useEffect(() => {
		if (!onSelectionChange) return;

		onSelectionChange(
			table.getSelectedRowModel().rows.map((row) => row.original),
		);
	}, [onSelectionChange, rowSelection, table]);

	return table;
};

export default useRegistryTable;
