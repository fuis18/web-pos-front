// src/components/tables/PagTable.tsx
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationLink,
	PaginationEllipsis,
} from "@/components/ui/pagination";

interface PagTableProps {
	page: number;
	setPage: (page: number) => void;
	totalPages: number;
}

const PagTable = ({ page, setPage, totalPages }: PagTableProps) => {
	const pages: (number | "dots")[] = [];

	// START
	if (page <= 3) {
		for (let i = 1; i <= Math.min(3, totalPages); i++) {
			pages.push(i);
		}
		if (totalPages > 3) {
			pages.push("dots");
			pages.push(totalPages);
		}
	}

	// MIDDLE
	else if (page < totalPages - 2) {
		pages.push(1);
		pages.push("dots");
		pages.push(page - 1, page, page + 1);
		pages.push("dots");
		pages.push(totalPages);
	}

	// END
	else {
		pages.push(1);
		pages.push("dots");
		for (let i = totalPages - 2; i <= totalPages; i++) {
			pages.push(i);
		}
	}

	return (
		<Pagination>
			<PaginationContent>
				{/* PREVIOUS */}
				{page > 1 && (
					<PaginationItem>
						<PaginationPrevious onClick={() => setPage(page - 1)} />
					</PaginationItem>
				)}

				{/* PAGE BUTTONS */}
				{pages.map((item, index) => (
					<PaginationItem key={index}>
						{item === "dots" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								isActive={page === item}
								onClick={() => setPage(item)}
							>
								{item}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				{/* NEXT */}
				{page < totalPages && (
					<PaginationItem>
						<PaginationNext onClick={() => setPage(page + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PagTable;
