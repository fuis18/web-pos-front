import { CONFIG } from "@/constants/config";
import * as repo from "../api/users.api";
import type { CreateUser, UserCredentials } from "../types/users.types";
import { v4 as uuidv4 } from "uuid";

type TokenValidator = (token: string) => boolean | Promise<boolean>;

type UserServiceDeps = {
	tokenValidator: TokenValidator;
};

export const createUserService = (deps: UserServiceDeps) => {
	return {
		async getUser(credentials: UserCredentials) {
			return repo.getUser(credentials);
		},

		async createUser(credentials: UserCredentials) {
			const userWithId: CreateUser = {
				id: uuidv4(),
				username: credentials.username,
				password: credentials.password,
			};
			return repo.createUser(userWithId);
		},

		async getToken({ token }: { token: string }) {
			return Boolean(await deps.tokenValidator(token));
		},
	};
};

export const userService = createUserService({
	tokenValidator: (token) => token === CONFIG.TOKEN,
});
