import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import navigationLinks from "./components/shared/navigation/navigationLinks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<div className="container-fluid p-2">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						{Object.entries(navigationLinks).map(
							([sectionLabel, navigationLinks]) =>
								navigationLinks.map(({ label, to, element }) => (
									<Route key={label} path={to} element={element} />
								))
						)}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	</React.StrictMode>
);
