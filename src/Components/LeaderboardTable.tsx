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

interface LeadboardTableProps {
	players: Player[];
}

const LeaderboardTable: React.FC<LeadboardTableProps> = ({ players }) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="min tabell">
				<TableHead>
					<TableRow>
						<TableCell>Rank</TableCell>
						<TableCell>Navn</TableCell>
						<TableCell>Elo</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{players.map((player, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								{index + 1}
							</TableCell>
							<TableCell>{player.name}</TableCell>
							<TableCell>{player.elo}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default LeaderboardTable;
