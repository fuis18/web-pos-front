import { api } from "@/lib/api";
import type { CreateUser, UserCredentials } from "../types/users.types";
import type { User } from "../types/users.types";

// POST /users/login  (or use findByUsername + compare on backend)
// For now we use the existing backend endpoints:
// The backend has findByUsername which returns the full user (with password).
// Authentication logic should eventually move to a dedicated auth module.
export async function getUser(credentials: UserCredentials): Promise<User[]> {
	const user = await api.post<User | null>("/users/login", credentials);
	return user ? [user] : [];
}

// POST /users
export async function createUser(user: CreateUser): Promise<number> {
	const res = await api.post<{ id: string }>("/users", {
		username: user.username,
		password: user.password,
	});
	return Number(res.id) || 0;
}
