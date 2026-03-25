import * as repo from "../repository/users.repository";
import type { CreateUser, UserCredentials } from "../types/users.types";
import { CONFIG } from "../../../constants/config";

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
				id: crypto.randomUUID(),
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
