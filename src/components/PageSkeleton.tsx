import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
	return (
		<div className="flex flex-col gap-4 p-4">
			{/* Barra de acciones */}
			<div className="flex gap-2">
				<Skeleton className="h-9 w-32" />
				<Skeleton className="h-9 w-32" />
			</div>
			{/* Tabla simulada */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-10 w-full" /> {/* header */}
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton key={i} className="h-10 w-full opacity-70" />
				))}
			</div>
		</div>
	);
}
