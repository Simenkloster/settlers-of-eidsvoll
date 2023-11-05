import React from "react";
import PlayerstatisticsCard from "../Components/PlayerstatisticCard";
import useGames from "../Hooks/useGames";
import usePlayers from "../Hooks/usePlayers";

const Statistics = () => {
	const games = useGames();
	const players = usePlayers();

	return (
		<div>
			{games.isLoading || players.isLoading ? (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "5rem",
					}}
				>
					Loading stats...
				</div>
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{players.players.map((player) => (
						<PlayerstatisticsCard player={player} games={games.games} />
					))}
				</div>
			)}
		</div>
	);
};

export default Statistics;
