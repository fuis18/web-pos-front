export interface CreateUser {
	id: string;
	username: string;
	password: string;
}

export interface User {
	id: string;
	username: string;
}

export type UserCredentials = Omit<CreateUser, "id">;
