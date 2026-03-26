import type { User } from "@/features/users/types/users.types";
import { create } from "zustand";

export interface UserStore {
	user: User | null;
	setUser: (user: User | null) => void;
	token: boolean;
	setToken: (token: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	token: false,
	setToken: (token) => set({ token }),
	user: null,
	setUser: (user) => set({ user }),
}));
