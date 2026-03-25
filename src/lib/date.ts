export function toLocalDay(date: string | Date): string {
	const d = typeof date === "string" ? new Date(date) : date;

	return d.toLocaleDateString("en-CA");
}
