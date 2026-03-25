import z from "zod";

export const userSchema = z.object({
	username: z
		.string()
		.min(6, "El nombre de usuario debe tener al menos 6 caracteres")
		.max(20, "El nombre de usuario no puede superar los 20 caracteres")
		.transform((val) => val.toLowerCase()),
	password: z
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(20, "La contraseña no puede superar los 20 caracteres"),
});

export type FormType = z.input<typeof userSchema>;

export const userToken = z.object({
	token: z.string().length(6, "El token debe tener 6 dígitos"),
});

export type TokenType = z.input<typeof userToken>;
