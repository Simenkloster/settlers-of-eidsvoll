import React from "react";
import { useState } from "react";
import { playersRef } from "../firebase/firebase";

const AddToDatabase: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [elo, setElo] = useState<number>(0);

	const handleEloInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setElo(parseInt(event.target.value));
	};

	const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const addPlayerToDatabase = () => {
		playersRef.push({
			name: name,
			elo: elo,
		});
	};

	return (
		<>
			<form onSubmit={addPlayerToDatabase}>
				<label>
					Spiller:
					<input
						type="text"
						value={name}
						onChange={handleNameInput}
						placeholder="Spiller"
					></input>
				</label>
				<label>
					Elo:
					<input type="number" onChange={handleEloInput} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		</>
	);
};

export default AddToDatabase;
