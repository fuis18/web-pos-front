import { useState } from "react";

export function usePagination(initialPage = 1) {
	const [page, setPage] = useState(initialPage);

	const reset = () => setPage(initialPage);

	return { page, setPage, reset };
}
