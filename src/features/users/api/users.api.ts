import { api } from "@/lib/api";
import type { UserCredentials, User } from "../types/users.types";

export const getUser = async (credentials: UserCredentials) => {
	const user = await api.post<User | null>("/users/login", credentials);
	return user ? [user] : [];
};

export const createUser = async (user: UserCredentials) => {
	const res = await api.post<{ id: string }>("/users", {
		username: user.username,
		password: user.password,
	});
	return Number(res.id) || 0;
};
