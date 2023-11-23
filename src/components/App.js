import { Outlet } from "react-router-dom";
import "./App.scss";
import MenuAppBar from "./shared/navigation/MenuAppBar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

function App() {
	return (
		<>
			<MenuAppBar />
			<Container maxWidth="xl">
				<Box>
					<Outlet />
				</Box>
			</Container>
		</>
	);
}

export default App;
