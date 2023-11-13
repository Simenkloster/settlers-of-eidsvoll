import LeaderboardTable from "../Components/LeaderboardTable";
import { useState } from "react";
import usePlayers from "../Hooks/usePlayers";
import "./Leaderboard.css";
import Rankingtypes from "../Types/RankingTypes";
import useGames from "../Hooks/useGames";
import {
	FormControl,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";

const Leaderboard = () => {
	const { players, isLoading: playersLoading } = usePlayers();
	const { games, isLoading: gamesLoading } = useGames();

	const [rankingtype, setRankingtype] = useState<Rankingtypes>(
		Rankingtypes.elo
	);

	const handleRankingtypeChange = (event: SelectChangeEvent<Rankingtypes>) => {
		setRankingtype(event.target.value as Rankingtypes);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<FormControl
				fullWidth
				sx={{
					width: "200px",
					margin: "auto",
					fontSize: "2rem",
					fontFamily: "VollkornSC-Bold",
				}}
			>
				<label
					style={{ fontSize: "1.2rem", textAlign: "center", margin: "0.5rem" }}
				>
					Ranking type
				</label>
				<Select
					sx={{
						width: "fit-content",
						margin: "auto",
						fontSize: "2rem",
						fontFamily: "VollkornSC-Bold",
					}}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={rankingtype}
					label="Ranking type"
					onChange={handleRankingtypeChange}
				>
					<MenuItem value={Rankingtypes.elo}>Elo</MenuItem>
					<MenuItem value={Rankingtypes.wins}>Wins</MenuItem>
					<MenuItem value={Rankingtypes.gamesplayed}>Games</MenuItem>
					<MenuItem value={Rankingtypes.avgpoints}>Points per game</MenuItem>
				</Select>
			</FormControl>

			{playersLoading || gamesLoading ? (
				<h1>Loading</h1>
			) : (
				<div>
					<LeaderboardTable
						players={players}
						games={games}
						rankingtype={rankingtype}
					/>{" "}
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
