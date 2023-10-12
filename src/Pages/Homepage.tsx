import React from "react";
import "./Homepage.css";
import Header from "../Components/Header";
import AddPlayer from "../Components/Addplayer";
import Tile from "../Components/Tile";

const Homepage = () => {
	return (
		<>
			<div className="headerContainer">
				<Header />
			</div>
			<div className="TileContainer">
				<Tile
					imageLink="Sheeptile.png"
					text="Statistics"
					routing="/statistics"
				/>
				<Tile
					imageLink="Oretile.png"
					text="Leaderboard"
					routing="/leaderboard"
				/>
				<Tile
					imageLink="Wheattile.png"
					text="Register game"
					routing="/registergame"
				/>
				<Tile
					imageLink="Woodtile.png"
					text="Game History"
					routing="/gamehistory"
				/>
				<Tile imageLink="Bricktile.png" text="Settings" routing="/settings" />
				<AddPlayer />
			</div>
		</>
	);
};

export default Homepage;
