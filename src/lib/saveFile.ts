interface SaveFileOptions {
	defaultName: string;
	filters: { name: string; extensions: string[] }[];
	content: Uint8Array;
}

export async function saveFileAs(
	options: SaveFileOptions,
): Promise<string | null> {
	const blob = new Blob([options.content.buffer as ArrayBuffer]);
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = options.defaultName;
	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
	URL.revokeObjectURL(url);

	return options.defaultName;
}
