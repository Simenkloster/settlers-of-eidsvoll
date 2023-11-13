import Player from "../Types/Player";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Team from "../Types/Team";
import useTeams from "../Hooks/useTeams";

interface AddPlayerProps {
	onScoreChange(poeng: number): void;
	onPlayerChange(spiller: string): void;
	players: Player[];
	teams: Team[];
}

const AddPlayer = ({
	onScoreChange,
	onPlayerChange,
	players,
	teams,
}: AddPlayerProps) => {
	const [textFieldValue, setTextFieldValue] = useState<string>("Select Player");

	const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextFieldValue(e.target.value);
		onPlayerChange(e.target.value);
	};

	const names = players
		.map((player) => player.name)
		.concat(teams.map((team) => team.teamname));

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
					options={names}
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
					style={{
						marginLeft: "10px",
						fontSize: "3rem",
						width: "70px",
						textAlign: "center",
					}}
					type="number"
					onChange={(e) => onScoreChange(parseInt(e.target.value))}
				/>
			</label>
		</div>
	);
};

export default AddPlayer;
