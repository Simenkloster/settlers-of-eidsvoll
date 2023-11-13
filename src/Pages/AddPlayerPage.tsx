import React from "react";
import makePlayerPromise from "../firebase/makePlayerPromise";
import usePlayers from "../Hooks/usePlayers";
import AddTeamCard from "../Components/AddTeamCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmAddModal from "../Components/ConfirmAddModal";
import Player from "../Types/Player";

const AddPlayerPage = () => {
	const [playerName, setPlayerName] = React.useState<string>("");
	const [playerAdded, setPlayerAdded] = React.useState<boolean>(false);
	const navigvate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => {
		setModalOpen(false);
		navigvate("/");
	};

	const existingPlayers = usePlayers();
	const existingPlayerNames = existingPlayers.players.map(
		(player) => player.name
	);

	const handlePlayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (existingPlayerNames.includes(playerName.toLowerCase())) {
				alert("Player already exists");
				throw new Error("Player already exists");
			}
			if (playerName.length < 2) {
				alert("Player name has to be at least 2 characters long");
				throw new Error("Player name too short");
			}
			if (playerName.length > 25) {
				alert("Player name has to be less than 25 characters long");
				throw new Error("Player name too long");
			}
			setPlayerAdded(true);
			handleOpen();
		} catch (e) {
			console.error("Error in adding player to database: ", e);
		}
	};

	return (
		<>
			<div
				style={{
					width: "70vw",
					border: "solid 1px",
					backgroundColor: "rgba(255, 228,196, 0.8)",
					borderRadius: "10px",
					fontSize: "1.5rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "2rem",
				}}
			>
				<h1>Add new player</h1>
				<form style={{ margin: "2rem" }} onSubmit={handlePlayerSubmit}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-around",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<div>
							Navn: <br></br>
							<input
								type="text"
								name="name"
								onChange={(e) => setPlayerName(e.target.value)}
							/>
						</div>{" "}
						<br></br>
						<button type="submit">Legg til Spiller</button>
					</div>
				</form>
			</div>
			<div
				style={{
					width: "70vw",
					border: "solid 1px",
					backgroundColor: "rgba(255, 228,196, 0.8)",
					borderRadius: "10px",
					fontSize: "1.5rem",

					margin: "2rem",
				}}
			>
				<AddTeamCard availablePlayers={existingPlayers.players} />
			</div>
			{playerAdded && (
				<ConfirmAddModal
					open={modalOpen}
					handleClose={handleClose}
					added={playerName}
				/>
			)}
		</>
	);
};

export default AddPlayerPage;
