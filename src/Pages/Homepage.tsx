import "./Homepage.css";
import Tile from "../Components/Tile";

const Homepage = () => {
	return (
		<>
			<div className="TileContainer">
				<Tile
					imageLink="Sheeptile.png"
					text="Møt spillerne"
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
				<Tile
					imageLink="Bricktile.png"
					text="Add new player"
					routing="/addplayer"
				/>
			</div>
		</>
	);
};

export default Homepage;
