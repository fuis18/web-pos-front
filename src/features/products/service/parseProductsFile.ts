import Papa from "papaparse";
import * as XLSX from "xlsx";

export type RawProductRow = Record<string, string>;

function getFileExtension(name: string): string {
	return name.slice(name.lastIndexOf(".")).toLowerCase();
}

function parseExcel(file: File): Promise<RawProductRow[]> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: "array" });
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const rows = XLSX.utils.sheet_to_json<RawProductRow>(sheet, {
					defval: "",
				});
				resolve(rows);
			} catch (err) {
				reject(err);
			}
		};
		reader.onerror = () => reject(new Error("Error leyendo el archivo"));
		reader.readAsArrayBuffer(file);
	});
}

function parseCsv(file: File): Promise<RawProductRow[]> {
	return new Promise((resolve, reject) => {
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => resolve(results.data as RawProductRow[]),
			error: (err: Error) => reject(err),
		});
	});
}

export async function parseProductsFile(file: File): Promise<RawProductRow[]> {
	const ext = getFileExtension(file.name);

	if (ext === ".csv") {
		return parseCsv(file);
	}

	if (ext === ".xlsx" || ext === ".xls") {
		return parseExcel(file);
	}

	throw new Error(`Formato no soportado: ${ext}`);
}
