import Player from "../Types/Player";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

interface AddPlayerProps {
	onScoreChange(poeng: number): void;
	onPlayerChange(spiller: string): void;
	players: Player[];
}

const AddPlayer = ({
	onScoreChange,
	onPlayerChange,
	players,
}: AddPlayerProps) => {
	const [textFieldValue, setTextFieldValue] = useState<string>("Select Player");

	const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextFieldValue(e.target.value);
		onPlayerChange(e.target.value);
		console.log(e.target.value);
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-evenly",
				padding: "10px",
				fontSize: "1.5rem",
			}}
		>
			<label>
				Spiller:
				<Autocomplete
					style={{
						width: 300,
						fontFamily: "VollkornSC-Regular",
						textTransform: "capitalize",
					}}
					options={players.map((player) => player.name)}
					id="combo-box-demo"
					onChange={(event, newValue) => {
						handleTextInputChange({
							target: { value: newValue },
						} as React.ChangeEvent<HTMLTextAreaElement>);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="standard"
							onChange={handleTextInputChange}
						/>
					)}
				/>
			</label>
			<label>
				Antall poeng:
				<input
					style={{ marginLeft: "10px" }}
					type="number"
					onChange={(e) => onScoreChange(parseInt(e.target.value))}
				/>
			</label>
		</div>
	);
};

export default AddPlayer;
