import React from "react";
import "./Leaderboard.css";
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
} from "@mui/material";
import "./Leaderboard.css";
import Player from "../Types/Player";
import Rankingtypes from "../Types/RankingTypes";
import { ToNameCase } from "../HelpFunctions/ToNameCase";
import Game from "../Types/Game";
import { CalculatePointsPerGame } from "../HelpFunctions/CalculatePointsPerGame";

interface LeadboardTableProps {
	players: Player[];
	games: Game[];
	rankingtype: Rankingtypes;
}

const LeaderboardTable: React.FC<LeadboardTableProps> = ({
	players,
	games,
	rankingtype,
}) => {
	let playerList = players;

	switch (rankingtype) {
		case Rankingtypes.elo:
			playerList = players.sort((a, b) => b.elo - a.elo);
			break;
		case Rankingtypes.gamesplayed:
			playerList = players.sort(
				(a, b) =>
					games.filter((game) =>
						game.result.find(
							(playerInGame) => playerInGame.spiller.name === b.name
						)
					).length -
					games.filter((game) =>
						game.result.find(
							(playerInGame) => playerInGame.spiller.name === a.name
						)
					).length
			);
			break;
		case Rankingtypes.wins:
			playerList = players.sort(
				(a, b) =>
					games.filter((game) =>
						game.result.find(
							(playerInGame) =>
								playerInGame.spiller.name === b.name && playerInGame.poeng >= 10
						)
					).length -
					games.filter((game) =>
						game.result.find(
							(playerInGame) =>
								playerInGame.spiller.name === a.name && playerInGame.poeng >= 10
						)
					).length
			);
			break;
		case Rankingtypes.avgpoints:
			playerList = players.sort(
				(a, b) =>
					CalculatePointsPerGame(b, games) - CalculatePointsPerGame(a, games)
			);
			break;
		default:
			break;
	}

	return (
		<>
			<TableContainer sx={{ margin: "20px" }}>
				<Table aria-label="min tabell">
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontSize: "2rem",
									fontFamily: "VollkornSC-Bold",
								}}
							>
								Rank
							</TableCell>
							<TableCell
								sx={{ fontSize: "2rem", fontFamily: "VollkornSC-Bold" }}
							>
								Navn
							</TableCell>
							<TableCell
								sx={{
									textAlign: "center",
									fontSize: "2rem",
									fontFamily: "VollkornSC-Bold",
								}}
							>
								{rankingtype}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{playerList.map((player, index) => (
							<TableRow key={index}>
								<TableCell
									component="th"
									scope="row"
									sx={{
										padding: "20px",
										fontSize: "2rem",
										fontFamily: "VollkornSC-Regular",
									}}
								>
									{index + 1}
								</TableCell>
								<TableCell
									sx={{
										padding: "20px",
										fontSize: "2rem",
										fontFamily: "VollkornSC-Regular",
									}}
								>
									{ToNameCase(player.name)}
								</TableCell>
								<TableCell
									sx={{
										padding: "20px",
										fontSize: "2rem",
										fontFamily: "VollkornSC-Regular",
										textAlign: "center",
									}}
								>
									{rankingtype === Rankingtypes.elo && player.elo.toFixed(1)}
									{rankingtype === Rankingtypes.gamesplayed &&
										games.filter((game) =>
											game.result.find(
												(playerInGame) =>
													playerInGame.spiller.name === player.name
											)
										).length}
									{rankingtype === Rankingtypes.wins &&
										games.filter((game) =>
											game.result.find(
												(playerInGame) =>
													playerInGame.spiller.name === player.name &&
													playerInGame.poeng >= 10
											)
										).length}
									{rankingtype === Rankingtypes.avgpoints &&
										CalculatePointsPerGame(player, games).toFixed(1)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default LeaderboardTable;
