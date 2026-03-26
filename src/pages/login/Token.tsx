"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { userToken } from "@/features/users/types/userSchema";
import type { TokenType } from "@/features/users/types/userSchema";
import type { SubmitHandler } from "react-hook-form";

import { createUserService } from "@/features/users/service/users.service";
import { useNavigate } from "react-router";
import { CONFIG } from "@/constants/config";
import { Label } from "@/components/ui/label";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";

const Token = () => {
	const navigate = useNavigate();
	const { setToken } = useUserStore();

	const userService = createUserService({
		tokenValidator: (token) => token === CONFIG.TOKEN,
	});

	const form = useForm<TokenType>({
		resolver: zodResolver(userToken),
		defaultValues: {
			token: "",
		},
	});

	const onSubmit: SubmitHandler<TokenType> = async (data) => {
		try {
			const parsed = userToken.parse(data);

			const token = await userService.getToken({
				token: parsed.token,
			});

			if (token) {
				form.reset();
				setToken(true);
				navigate("/login/signup");
			} else {
				form.setError("root", {
					type: "server",
					message: "No se pudo realizar la verificación.",
				});
			}
		} catch (error) {
			form.setError("root", {
				type: "server",
				message:
					"No se pudo realizar la verificación. " +
					(error instanceof Error ? error : ""),
			});
		}
	};

	return (
		<div className="form-container-otp">
			<form className="form-content" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="justify-center">
					<Label>Token</Label>
					<Controller
						control={form.control}
						name="token"
						render={({ field }) => (
							<InputOTP maxLength={6} {...field}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						)}
					/>
					{form.formState.errors.root && (
						<p className="text-red-500 text-sm">
							{form.formState.errors.root.message}
						</p>
					)}
					<span>
						<Button type="submit">Enviar</Button>
					</span>
				</div>
			</form>
		</div>
	);
};

export default Token;
