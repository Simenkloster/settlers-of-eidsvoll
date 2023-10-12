import React from "react";
import { useState } from "react";
import { playersRef } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";

const AddPlayer = () => {
	const [player, setPlayer] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		playersRef.push(spillerTilDb);
		setPlayer("");
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlayer(e.target.value);
	};

	const spillerTilDb = {
		name: player,
		elo: 1000,
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Spiller:
				<input type="text" value={player} onChange={handleChange} />
			</label>
			<button type="submit">Submit</button>
		</form>
	);
};

export default AddPlayer;
