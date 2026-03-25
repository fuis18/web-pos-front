import { insert, select } from "@/database/index.ts";
import type { CreateUser, UserCredentials } from "../types/users.types";
import type { User } from "../types/users.types";

export async function getUser(user: UserCredentials) {
	return select<User>(
		"SELECT * FROM users WHERE username = ? AND password = ?",
		[user.username, user.password],
	);
}

export async function createUser(user: CreateUser) {
	return insert("INSERT INTO users (id, username, password) VALUES (?, ?, ?)", [
		user.id,
		user.username,
		user.password,
	]);
}
