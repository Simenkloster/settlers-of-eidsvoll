import HomeIcon from "@mui/icons-material/Home";
import { Box, Modal } from "@mui/material";
import Game from "../Types/Game";
import { CalculateNewElos } from "../HelpFunctions/CalculateNewElos";
import updatePlayerElo from "../firebase/updatePlayerElo";
import { useNavigate } from "react-router-dom";
import {
	DensityMediumSharp,
	TrendingDown,
	TrendingUp,
} from "@mui/icons-material";

interface SuccessModalProps {
	open: boolean;
	handleClose: () => void;
	game: Game;
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
};

const SuccessModal = ({ open, handleClose, game }: SuccessModalProps) => {
	const playersWitnewElos = CalculateNewElos(game);
	const navigate = useNavigate();

	async function postNewElosToFirebase() {
		for (const player of playersWitnewElos) {
			try {
				await updatePlayerElo(player, player.elo);
				console.log("Player elo updated");
			} catch (error) {
				console.log("Error updating player elo");
			}
		}
	}

	if (game.ranked == true) {
		postNewElosToFirebase();
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				{game.ranked && <h1>Spillet ble registrert!</h1>}
				{!game.ranked && (
					<h1>
						Spillet ble registrert som unranked! Her er rating-endringene som
						ville tatt sted.
					</h1>
				)}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontSize: "1.5rem",
					}}
				>
					{game.result.map((player) => (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "3fr 3fr",
								gridColumnGap: "1rem",
								textAlign: "center",
							}}
						>
							<p>{player.spiller.name}</p>

							<p>
								{Math.round(player.spiller.elo)}{" "}
								{Math.round(player.spiller.elo) <
									Math.round(
										playersWitnewElos.find(
											(p) =>
												p.name.toLowerCase() ==
												player.spiller.name.toLowerCase()
										)?.elo!
									) && (
									<TrendingUp
										style={{
											color: "green",
											fontSize: "2.5rem",
											verticalAlign: "middle",
										}}
									/>
								)}
								{Math.round(player.spiller.elo) >
									Math.round(
										playersWitnewElos.find(
											(p) =>
												p.name.toLowerCase() ==
												player.spiller.name.toLowerCase()
										)?.elo!
									) && (
									<TrendingDown
										style={{
											color: "red",
											fontSize: "2.5rem",
											verticalAlign: "middle",
										}}
									/>
								)}
								{Math.round(player.spiller.elo) ==
									Math.round(
										playersWitnewElos.find(
											(p) =>
												p.name.toLowerCase() ==
												player.spiller.name.toLowerCase()
										)?.elo!
									) && (
									<DensityMediumSharp
										style={{
											color: "black",
											fontSize: "1.5rem",
											verticalAlign: "middle",
										}}
									/>
								)}{" "}
								{Math.round(
									playersWitnewElos.find(
										(p) =>
											p.name.toLowerCase() == player.spiller.name.toLowerCase()
									)?.elo!
								)}
							</p>
						</div>
					))}
				</div>
				<button
					style={{
						position: "absolute",
						bottom: "5%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					onClick={() => {
						handleClose();
						navigate("/");
					}}
				>
					<HomeIcon /> Home
				</button>
			</Box>
		</Modal>
	);
};

export default SuccessModal;
