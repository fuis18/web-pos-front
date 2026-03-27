import Header from "@/components/Header";
import "./App.css";

import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";

function App() {
	return (
		<>
			<Header />
			<div className="px-4 py-2">
				<Suspense fallback={<PageSkeleton />}>
					<Outlet></Outlet>
				</Suspense>
			</div>
		</>
	);
}

export default App;
