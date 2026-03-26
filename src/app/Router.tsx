import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
	useLocation,
} from "react-router-dom";
import App from "./App";

import { lazy, Suspense, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

const Registry = lazy(() => import("@/pages/Registry"));
const Products = lazy(() => import("@/pages/Products"));
const Sales = lazy(() => import("@/pages/Sales"));

const Login = lazy(() => import("@/pages/login/Login"));
const SignIn = lazy(() => import("@/pages/login/SignUp"));
const Token = lazy(() => import("@/pages/login/Token"));

// Resetea el token cuando el usuario sale de /login
const TokenResetWatcher = () => {
	const location = useLocation();
	const { token, setToken } = useUserStore();

	useEffect(() => {
		if (!location.pathname.startsWith("/login") && token) {
			setToken(false);
		}
	}, [location.pathname, token, setToken]);

	return null;
};

const TokenGuard = () => {
	const { token } = useUserStore();

	if (!token) {
		return <Navigate to="/login/token" replace />;
	}

	return <Outlet />;
};

function Router() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<TokenResetWatcher />
				<Routes>
					<Route element={<App />}>
						<Route path="/" element={<Registry />} />

						<Route path="/products">
							<Route index element={<Products />} />
						</Route>

						<Route path="/sales">
							<Route index element={<Sales />} />
						</Route>

						<Route path="/login">
							<Route index element={<Login />} />
							<Route path="token" element={<Token />} />
							<Route element={<TokenGuard />}>
								<Route path="signup" element={<SignIn />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default Router;
