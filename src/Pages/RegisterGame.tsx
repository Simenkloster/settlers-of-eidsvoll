import React, { useEffect } from "react";
import Game from "../Types/Game";
import AddPlayer from "../Components/Addplayer";
import { useState } from "react";
import ValidateGame from "../Validators/ValidateGame";
import usePlayers from "../Hooks/usePlayers";
import { useNavigate } from "react-router-dom";
import GameBuilder from "../HelpFunctions/GameBuilder";
import makeGamePromise from "../firebase/makeGamePromise";
import SuccessModal from "../Components/SuccessModal";
import useTeams from "../Hooks/useTeams";
import Player from "../Types/Player";

const RegisterGame = () => {
	const [game, setGame] = useState<Game>();
	const [numberOfPlayers, setNumberOfPlayers] = React.useState<number>(4);
	const navigvate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => {
		setModalOpen(false);
		navigvate("/");
	};
	const [ranked, setRanked] = useState<boolean>(true);

	const [sent, setSent] = useState(false);

	const defaultPlayerData = Array.from(Array(numberOfPlayers).keys()).map(
		(i) => ({
			spiller: "",
			poeng: 0,
		})
	);

	const players = usePlayers();

	const teams = useTeams().teams;

	const [playerData, setPlayerData] = useState(defaultPlayerData);

	const handleGameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (ValidateGame(playerData, players.players)) {
			const newGame: Game = GameBuilder(
				numberOfPlayers,
				playerData,
				players.players,
				ranked
			);
			try {
				await makeGamePromise(newGame);
				setSent(true);
				setGame(newGame);
				handleOpen();
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
							teams={teams}
						/>
						<br></br>
						<br></br>
					</>
				))}
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
							value="ranked"
							checked={ranked === true}
							onChange={() => setRanked(true)}
							name="ranked"
						/>
						ranked
					</label>
					<label>
						<input
							type="radio"
							value="unranked"
							checked={ranked === false}
							onChange={() => setRanked(false)}
							name="ranked"
						/>
						unranked
					</label>
				</div>{" "}
				<br></br>
				<br></br>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<button type="submit">Registrer spill</button>
				</div>
			</form>
			{sent && (
				<SuccessModal
					open={modalOpen}
					handleClose={handleClose}
					game={game as Game}
				/>
			)}
		</div>
	);
};

export default RegisterGame;
