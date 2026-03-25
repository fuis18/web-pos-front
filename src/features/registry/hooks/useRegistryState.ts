// src\features\registry\hooks\useRegistryState.ts
import { useMemo, useState } from "react";
import { EMPTY_REGISTRY_ROW } from "../types/constants";
import type { Registry } from "../types/registry.types";

export const useRegistryState = () => {
	const [data, setData] = useState<Registry[]>([EMPTY_REGISTRY_ROW]);

	const total = useMemo(
		() => data.reduce((sum, row) => sum + row.total, 0),
		[data],
	);

	return { data, setData, total };
};
