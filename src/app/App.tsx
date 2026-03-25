import Header from "@/components/Header";
import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<div className="px-4 py-2">
				<Outlet></Outlet>
			</div>
		</>
	);
}

export default App;
