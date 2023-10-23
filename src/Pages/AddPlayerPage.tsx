import React from "react";
import makePlayerPromise from "../firebase/makePlayerPromise";
import usePlayers from "../Hooks/usePlayers";

const AddPlayerPage = () => {
	const [playerName, setPlayerName] = React.useState<string>("");
	const [playerAdded, setPlayerAdded] = React.useState<boolean>(false);

	const existingPlayers = usePlayers().players.map((player) => player.name);

	const handlePlayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (existingPlayers.includes(playerName.toLowerCase())) {
				alert("Player already exists");
				throw new Error("Player already exists");
			}
			await makePlayerPromise(playerName);
			setPlayerAdded(true);
		} catch (e) {
			console.error("Error in adding player to database: ", e);
		}
	};

	return (
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
			}}
		>
			<h1>Add new player</h1>
			<form style={{ margin: "2rem" }} onSubmit={handlePlayerSubmit}>
				<label>
					Navn:
					<input
						type="text"
						name="name"
						onChange={(e) => setPlayerName(e.target.value)}
					/>
				</label>{" "}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AddPlayerPage;
