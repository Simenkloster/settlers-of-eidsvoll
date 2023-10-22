import "./Homepage.css";
import Header from "../Components/Header";
import Tile from "../Components/Tile";

const Homepage = () => {
	return (
		<>
			<div className="TileContainer">
				<Tile
					imageLink="Sheeptile.png"
					text="Statistics"
					routing="/statistics"
				/>
				<Tile
					imageLink="Oretile.png"
					text="Register game"
					routing="/registergame"
				/>
				<Tile
					imageLink="Wheattile.png"
					text="Leaderboard"
					routing="/leaderboard"
				/>
				<Tile
					imageLink="Woodtile.png"
					text="Game History"
					routing="/gamehistory"
				/>
				<Tile imageLink="Bricktile.png" text="Settings" routing="/settings" />
			</div>
		</>
	);
};

export default Homepage;
