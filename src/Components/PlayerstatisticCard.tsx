import React from "react";
import Player from "../Types/Player";
import Game from "../Types/Game";
import { CalculatePointsPerGame } from "../HelpFunctions/CalculatePointsPerGame";

interface PlayerstatisticsCardProps {
	player: Player;
	games: Game[];
}

const PlayerstatisticsCard = ({ player, games }: PlayerstatisticsCardProps) => {
	return (
		<div
			style={{
				width: "30%",
				border: "solid 1px",
				backgroundColor: "rgba(255, 228,196, 0.8)",
				borderRadius: "10px",
				fontSize: "1.5rem",
				display: "grid",
				gridTemplateRows: "1fr 1fr 1fr 1fr",
				textAlign: "center",
				margin: "1rem",
				alignItems: "center",
			}}
		>
			<div>{player.name}</div>
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
			</div>
		</div>
	);
};

export default PlayerstatisticsCard;
