import type { User } from "@/features/users/types/users.types";
import { create } from "zustand";

export interface UserStore {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
