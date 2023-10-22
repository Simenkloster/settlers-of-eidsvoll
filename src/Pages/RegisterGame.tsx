import React, { useEffect } from "react";
import Game from "../Types/Game";
import AddPlayer from "../Components/Addplayer";
import { useState } from "react";

const RegisterGame = () => {
	const [game, setGame] = React.useState<Game>();
	const [numberOfPlayers, setNumberOfPlayers] = React.useState<number>(4);

	const defaultPlayerData = Array.from(Array(numberOfPlayers).keys()).map(
		(i) => ({
			spiller: "",
			poeng: 0,
		})
	);

	const [playerData, setPlayerData] = useState(defaultPlayerData);

	const handleGameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(playerData);
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
		<>
			<div className="radiobuttons">
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

			<form onSubmit={handleGameSubmit}>
				{Array.from(Array(numberOfPlayers).keys()).map((i) => (
					<>
						<AddPlayer
							key={i}
							onScoreChange={(score) => handleScoreChange(score, i)}
							onPlayerChange={(player) => handlePlayerChange(player, i)}
						/>
						<br></br>
						<br></br>
					</>
				))}
				<button type="submit">Registrer spill</button>
				<button type="reset" onClick={() => setPlayerData(defaultPlayerData)}>
					Reset
				</button>
			</form>
		</>
	);
};

export default RegisterGame;
