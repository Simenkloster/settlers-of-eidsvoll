import React from "react";
import Player from "../Types/Player";
import Game from "../Types/Game";
import { CalculatePointsPerGame } from "../HelpFunctions/CalculatePointsPerGame";
import playerData from "../HelpFunctions/playerData";

interface PlayerstatisticsCardProps {
	player: Player;
	games: Game[];
}

const PlayerstatisticsCard = ({ player, games }: PlayerstatisticsCardProps) => {
	const playerdata =
		playerData[player.name.toLowerCase().trim() as keyof typeof playerData];

	// console.log("player we are getting: " + player.name);
	// console.log(playerdata);

	return (
		<div
			style={{
				width: "15vw",
				height: "60vh",
				border: "solid 1px",
				backgroundColor: "rgba(255, 228,196, 0.8)",
				borderRadius: "10px",
				fontSize: "1.4rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				textAlign: "center",
				margin: "1rem",
				alignItems: "center",
			}}
		>
			<div style={{ fontFamily: "VollkornSC-Bold" }}>{player.name}</div>{" "}
			<div>
				Games:{" "}
				{
					games.filter((game) =>
						game.result.find(
							(playerInGame) => playerInGame.spiller.name === player.name
						)
					).length
				}
			</div>
			<div>
				Wins:{" "}
				{
					games.filter((game) =>
						game.result.find(
							(playerInGame) =>
								playerInGame.spiller.name === player.name &&
								playerInGame.poeng >= 10
						)
					).length
				}
			</div>
			<div>
				Points pr game: {CalculatePointsPerGame(player, games).toFixed(2)}
			</div>{" "}
			<br></br>
			{playerdata ? (
				<div>
					<label style={{ fontFamily: "VollkornSC-Bold" }}>Styrke</label>
					<br></br>
					{playerdata.strength}
				</div>
			) : (
				<p>Kunne ikke laste inn styrke</p>
			)}
			<br></br>
			{playerdata ? (
				<div>
					<label style={{ fontFamily: "VollkornSC-Bold" }}>Svakhet</label>
					<br></br>
					{playerdata.weakness}
				</div>
			) : (
				<p>Kunne ikke laste inn svakhet</p>
			)}
		</div>
	);
};

export default PlayerstatisticsCard;
