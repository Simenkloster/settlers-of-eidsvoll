import makeTeamPromise from "../firebase/makeTeamPromise";
import useTeams from "../Hooks/useTeams";
import { useState } from "react";
import Team from "../Types/Team";
import Player from "../Types/Player";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import StringToPlayer from "../HelpFunctions/StringToPlayer";
import ConfirmAddModal from "./ConfirmAddModal";
import { useNavigate } from "react-router-dom";

interface addTeamCardProps {
	availablePlayers: Player[];
}

const AddTeamCard = ({ availablePlayers }: addTeamCardProps) => {
	const [teamName, setTeamName] = useState<string>("");
	const [player1, setPlayer1] = useState<string>("");
	const [player2, setPlayer2] = useState<string>("");
	const [teamAdded, setTeamAdded] = useState<boolean>(false);
	const navigvate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => {
		setModalOpen(false);
		navigvate("/");
	};

	const existingTeams = useTeams().teams;
	console.log(existingTeams);

	const handleTeamSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let match: boolean = false;
			let nameMatch: boolean = false;
			if (teamName.length < 2) {
				alert("Team name has to be at least 2 characters long");
				throw new Error("Team name too short");
			}
			if (teamName.length > 25) {
				alert("Team name has to be less than 25 characters long");
				throw new Error("Team name too long");
			}
			if (existingTeams.find((team) => team.teamname === teamName)) {
				alert("Team name already exists");
				throw new Error("Team name already exists");
			}
			if (player1 === "" || player2 === "") {
				alert("Please select two players");
				throw new Error("Please select two players");
			}
			if (player1 === player2) {
				alert("Please select two different players");
				throw new Error("Please select two different players");
			}
			const player1Object = StringToPlayer(player1, availablePlayers);
			const player2Object = StringToPlayer(player2, availablePlayers);
			if (!player1Object || !player2Object) {
				alert("Please select two existing players");
				throw new Error("Please select two existing players");
			}

			existingTeams.forEach((team) => {
				if (
					team.players.find((player) => player.name === player1) &&
					team.players.find((player) => player.name === player2)
				) {
					match = true;
				}
			});

			if (match) {
				alert("This team already exists");
				throw new Error("This team already exists");
			}

			setTeamAdded(true);
			handleOpen();
		} catch (e) {
			console.error("Error in adding team to database: ", e);
		}
	};

	const handlePlayer1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPlayer1(e.target.value);
	};

	const handlePlayer2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPlayer2(e.target.value);
	};

	return (
		<>
			<div style={{ height: "20rem" }}>
				<h1 style={{ textAlign: "center" }}>Add new team</h1>
				<form style={{ margin: "2rem" }} onSubmit={handleTeamSubmit}>
					<div
						className="formContainer"
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "center",
							}}
						>
							Team name: <br></br>
							<input
								style={{ fontSize: "1.5rem" }}
								type="text"
								name="name"
								onChange={(e) => setTeamName(e.target.value)}
							/>
						</div>

						<div>
							Spillere: <br></br>
							<Autocomplete
								style={{
									width: 300,
									fontFamily: "VollkornSC-Regular",
									textTransform: "capitalize",
								}}
								options={availablePlayers.map((player) => player.name)}
								id="combo-box-demo"
								onChange={(event, newValue) => {
									handlePlayer1Change({
										target: { value: newValue },
									} as React.ChangeEvent<HTMLTextAreaElement>);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										onChange={handlePlayer1Change}
									/>
								)}
							/>
							<br></br>
							<Autocomplete
								style={{
									width: 300,
									fontFamily: "VollkornSC-Regular",
									textTransform: "capitalize",
								}}
								options={availablePlayers.map((player) => player.name)}
								id="combo-box-demo"
								onChange={(event, newValue) => {
									handlePlayer2Change({
										target: { value: newValue },
									} as React.ChangeEvent<HTMLTextAreaElement>);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										onChange={handlePlayer2Change}
									/>
								)}
							/>
						</div>
					</div>
					<br></br>
					<div style={{ display: "flex", textAlign: "center" }}>
						<button style={{ margin: "auto" }} type="submit">
							Legg til Team
						</button>
					</div>
				</form>
			</div>
			{teamAdded && (
				<ConfirmAddModal
					open={modalOpen}
					handleClose={handleClose}
					added={{
						teamname: teamName,
						players: [
							StringToPlayer(player1, availablePlayers),
							StringToPlayer(player2, availablePlayers),
						],
					}}
				/>
			)}
		</>
	);
};

export default AddTeamCard;
