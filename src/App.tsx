import React from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Homepage />
		</ThemeProvider>
	);
}

export default App;
