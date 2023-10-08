import React from "react";
import "./Homepage.css";
import Header from "../Components/Header";
import Leaderboard from "../Components/Leaderboard";
import theme from "../theme";

const Homepage = () => {
	return (
		<div className="HomepageContainer">
			<Header />
			<Leaderboard />
		</div>
	);
};

export default Homepage;
