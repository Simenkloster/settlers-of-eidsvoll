import "./App.css";
import Homepage from "./Pages/Homepage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Statistics from "./Pages/Statistics";
import RegisterGame from "./Pages/RegisterGame";
import Leaderboard from "./Pages/Leaderboard";
import GameHistory from "./Pages/GameHistory";
import Settings from "./Pages/Settings";

const App: React.FC = () => {
	return (
		<>
			<div className="headerContainer">
				<Header />
			</div>
			<Router>
				<Routes>
					<Route path="/" Component={Homepage} />
					<Route path="/statistics" Component={Statistics} />
					<Route path="/registergame" Component={RegisterGame} />
					<Route path="/leaderboard" Component={Leaderboard} />
					<Route path="/gamehistory" Component={GameHistory} />
					<Route path="/settings" Component={Settings} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
