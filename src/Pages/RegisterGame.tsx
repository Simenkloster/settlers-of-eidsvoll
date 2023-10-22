import React, { useEffect } from "react";
import Game from "../Types/Game";
import AddPlayer from "../Components/Addplayer";
import { useState } from "react";
import ValidateGame from "../Validators/ValidateGame";
import usePlayers from "../Hooks/usePlayers";

import GameBuilder from "../HelpFunctions/GameBuilder";
import makeGamePromise from "../firebase/makeGamePromise";

const RegisterGame = () => {
	const [numberOfPlayers, setNumberOfPlayers] = React.useState<number>(4);

	const [sent, setSent] = useState(false);

	const defaultPlayerData = Array.from(Array(numberOfPlayers).keys()).map(
		(i) => ({
			spiller: "",
			poeng: 0,
		})
	);

	const players = usePlayers();
	const [playerData, setPlayerData] = useState(defaultPlayerData);

	const handleGameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (ValidateGame(playerData, players.players)) {
			const newGame: Game = GameBuilder(
				numberOfPlayers,
				playerData,
				players.players
			);
			try {
				await makeGamePromise(newGame);
				setSent(true);
			} catch (e) {
				console.error("Error in sending game to database: ", e);
			}
		} else {
			alert(
				"Det skjedde en feil i registrering av spillet. Venligst dobbelsjekk at alle feltene er fylt ut riktig."
			);
		}
	};

	const handleScoreChange = (score: number, index: number) => {
		const newPlayerData = [...playerData];
		newPlayerData[index].poeng = score;
		setPlayerData(newPlayerData);
	};

	const handlePlayerChange = (player: string, index: number) => {
		const newPlayerData = [...playerData];
		newPlayerData[index].spiller = player;
		setPlayerData(newPlayerData);
	};

	useEffect(() => {
		const updatedPlayerData = [...playerData];
		if (numberOfPlayers < updatedPlayerData.length) {
			updatedPlayerData.splice(numberOfPlayers);
		} else {
			for (let i = updatedPlayerData.length; i < numberOfPlayers; i++) {
				updatedPlayerData.push({ spiller: "", poeng: 0 });
			}
		}
		setPlayerData(updatedPlayerData);
	}, [numberOfPlayers]);

	return (
		<div>
			<div
				className="radiobuttons"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-evenly",
					fontSize: "1.5rem",
				}}
			>
				<label>
					<input
						type="radio"
						value="4"
						checked={numberOfPlayers === 4}
						onChange={() => setNumberOfPlayers(4)}
						name="noOfPlayers"
					/>
					4 players
				</label>
				<label>
					<input
						type="radio"
						value="3"
						checked={numberOfPlayers === 3}
						onChange={() => setNumberOfPlayers(3)}
						name="noOfPlayers"
					/>
					3 players
				</label>
			</div>
			<br></br>
			<br></br>
			<form onSubmit={handleGameSubmit}>
				{Array.from(Array(numberOfPlayers).keys()).map((i) => (
					<>
						<AddPlayer
							key={i}
							onScoreChange={(score) => handleScoreChange(score, i)}
							onPlayerChange={(player) => handlePlayerChange(player, i)}
							players={players.players}
						/>
						<br></br>
						<br></br>
					</>
				))}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<button type="submit">Registrer spill</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterGame;
