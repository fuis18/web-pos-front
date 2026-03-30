// src/features/registry/hooks/useFocusableCell.ts
import type {
	FocusColumn,
	FocusTarget,
} from "@/features/registry/types/focus.types";
import { useLayoutEffect, useRef } from "react";

interface Params {
	rowIndex: number;
	column: FocusColumn;
	focus: FocusTarget | null;
}

const useFocusableCell = ({ rowIndex, column, focus }: Params) => {
	const ref = useRef<HTMLInputElement>(null);

	const shouldFocus = focus?.rowIndex === rowIndex && focus?.column === column;

	useLayoutEffect(() => {
		if (shouldFocus) {
			ref.current?.focus();
			ref.current?.select();
		}
	}, [shouldFocus]);

	return ref;
};

export default useFocusableCell;
