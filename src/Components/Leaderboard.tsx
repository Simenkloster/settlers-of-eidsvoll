import React from "react";
import "./Leaderboard.css";
import TestPlayers from "../TestObjects/TestPlayers";
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
} from "@mui/material";
import { ReactElement } from "react";
import "./Leaderboard.css";
import { Form } from "react-router-dom";

const Leaderboard = (): ReactElement => {
	var players = TestPlayers;
	players.sort((a, b) => {
		return b.elo - a.elo;
	});

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

export default Leaderboard;
