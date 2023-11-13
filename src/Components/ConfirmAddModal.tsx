import Player from "../Types/Player";
import Team from "../Types/Team";
import { Box, Modal } from "@mui/material";
import makePlayerPromise from "../firebase/makePlayerPromise";
import makeTeamPromise from "../firebase/makeTeamPromise";
import { useNavigate } from "react-router-dom";

interface ConfirmAddModalProps {
	open: boolean;
	handleClose: () => void;
	added: string | Team;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "fit-content",
	bgcolor: "bisque",
	border: "2px solid #000",
	borderRadius: "20px",
	boxShadow: 24,
	p: 10,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "center",
};

const ConfirmAddModal = ({
	open,
	handleClose,
	added,
}: ConfirmAddModalProps) => {
	const navigate = useNavigate();
	const sendNewPlayer = async () => {
		try {
			await makePlayerPromise(added as string);
			console.log("Player added");
		} catch (error) {
			console.log("Error adding player");
		}
	};

	const sendNewTeam = async () => {
		try {
			await makeTeamPromise(added as Team);
			console.log("Team added");
		} catch (error) {
			console.log("Error adding team");
		}
	};

	console.log(added.valueOf());

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				{typeof added === "string" ? (
					<>
						<h1>
							Sikker på at du vil legge til spilleren med navn "{added}" ?
						</h1>
						<button
							onClick={() => {
								sendNewPlayer();
								handleClose();
								navigate("/");
							}}
						>
							Legg til
						</button>
						<button
							onClick={() => {
								handleClose();
								navigate("/");
							}}
						>
							Avbryt
						</button>
					</>
				) : (
					<>
						<h1>
							Sikker på at du vil legge til laget "{added.teamname}" med{" "}
							{added.players[0].name} og {added.players[1].name} ?
						</h1>
						<button
							onClick={() => {
								sendNewTeam();
								handleClose();
								navigate("/");
							}}
						>
							Legg til
						</button>
						<br></br>
						<button
							onClick={() => {
								handleClose();
								navigate("/");
							}}
						>
							Avbryt
						</button>
					</>
				)}
			</Box>
		</Modal>
	);
};

export default ConfirmAddModal;
