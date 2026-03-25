export type FocusColumn = "code" | "name" | "quantity";

export interface FocusTarget {
	rowIndex: number;
	column: FocusColumn;
}
