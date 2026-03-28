// src/components/dialogs/ProductImportDialog.tsx
"use client";

import { useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	type ImportSummary,
	importProducts,
} from "@/features/products/api/products.api";
import { parseProductsFile } from "../service/parseProductsFile";
import { mapToImportRows } from "../service/mapImport";

interface ImportDialogProps {
	children?: React.ReactNode;
	onFileUpload?: (file: File) => void;
	onImportSuccess?: () => void;
}

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xls"];

function isAcceptedFile(file: File): boolean {
	return ACCEPTED_EXTENSIONS.some((ext) =>
		file.name.toLowerCase().endsWith(ext),
	);
}

const ImportDialog = ({ children, onImportSuccess }: ImportDialogProps) => {
	"use no memo";
	const inputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [summary, setSummary] = useState<ImportSummary | null>(null);
	const [dragging, setDragging] = useState(false);

	const selectFile = (f: File) => {
		if (!isAcceptedFile(f)) {
			setError("Formato no soportado. Usa .csv, .xlsx o .xls");
			return;
		}
		setError(null);
		setSummary(null);
		setFile(f);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (selected) selectFile(selected);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragging(false);
		const dropped = e.dataTransfer.files[0];
		if (dropped) selectFile(dropped);
	};

	const handleImport = async () => {
		if (!file) return;
		setLoading(true);
		setError(null);
		setSummary(null);

		try {
			const rawRows = await parseProductsFile(file);

			const rows = mapToImportRows(rawRows);

			const result = await importProducts(rows);

			setSummary(result);
			onImportSuccess?.();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Error al importar productos.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleClose = (next: boolean) => {
		if (!next) {
			setFile(null);
			setError(null);
			setSummary(null);
		}
		setOpen(next);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Importar productos</DialogTitle>
				</DialogHeader>
				<div
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`mt-4 flex flex-col gap-2 items-center justify-center border-2 border-dashed p-8 rounded transition-colors ${
						dragging ? "border-primary bg-primary/5" : "border-gray-300"
					}`}
				>
					<p className="text-sm text-gray-500 pointer-events-none">
						Arrastra un archivo CSV o Excel aquí
					</p>
				</div>

				<input
					ref={inputRef}
					type="file"
					accept=".csv,.xlsx,.xls"
					className="hidden"
					onChange={handleFileChange}
				/>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => inputRef.current?.click()}
				>
					Buscar en el dispositivo
				</Button>

				{file && (
					<p className="text-sm text-green-600">
						Archivo seleccionado: {file.name}
					</p>
				)}

				{error && <p className="text-sm text-red-600">{error}</p>}

				{summary && (
					<div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-800 space-y-1">
						<p className="font-medium">Importación completada</p>
						<ul className="list-disc list-inside">
							<li>{summary.imported} importados</li>
							<li>{summary.updated} actualizados</li>
							<li>{summary.skipped} omitidos (sin cambios)</li>
						</ul>
					</div>
				)}

				{!summary && (
					<Button disabled={!file || loading} onClick={handleImport}>
						{loading ? "Importando..." : "Importar"}
					</Button>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ImportDialog;
