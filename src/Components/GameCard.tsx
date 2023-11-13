import { EmojiEvents } from "@mui/icons-material";
import Game from "../Types/Game";
import { TrendingUp } from "@mui/icons-material";
import { TrendingUp } from "@mui/icons-material";
import { DensityMediumSharp } from "@mui/icons-material";

interface GameCardProps {
	game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
	const result = game.result.sort((a, b) => {
		return b.poeng - a.poeng;
	});

	return (
		<div
			style={{
				width: "70vw",
				border: "solid 1px",
				backgroundColor: "rgba(255, 228,196, 0.8)",
				borderRadius: "10px",
				fontSize: "1.5rem",
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				textAlign: "center",
				margin: "1rem",
				alignItems: "center",
			}}
		>
			<div>
				{" "}
				Played on <br></br> {game.date.substring(0, game.date.indexOf("T"))}
				<br></br>
				<br></br>
				{game.ranked ? (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p>Ranked</p>
						<TrendingUp
							style={{
								color: "green",
							}}
						/>
					</div>
				) : (
					<p>Unranked</p>
				)}
				<br></br>
				<br></br>
				{game.ranked ? (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p>Ranked</p>
						<TrendingUp
							style={{
								color: "green",
							}}
						/>
					</div>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p>Unranked</p>
						<DensityMediumSharp
							style={{
								color: "black",
								fontSize: "1.5rem",
								verticalAlign: "middle",
							}}
						/>
					</div>
				)}
			</div>

			<div>
				{result.map((player, index) => {
					return (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 3fr",
								gridGap: "0.5rem",
								fontSize: "1.5rem",
							}}
						>
							<p style={{ justifySelf: "center" }}>
								{player.poeng}{" "}
								{index == 0 && (
									<EmojiEvents
										style={{
											verticalAlign: "middle",
											color: "darkgoldenrod",
											fontSize: "2rem",
										}}
									/>
								)}
							</p>
							<p>{player.spiller.name}</p>
						</div>
					);
				})}
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				{game.numberofplayers == 4 && (
					<img
						style={{ width: "30px", height: "29px" }}
						src="/fourdice.png"
						alt="firerterning"
					/>
				)}{" "}
				{game.numberofplayers == 3 && (
					<img
						style={{ width: "30px", height: "29px" }}
						src="/threedice.png"
						alt="firerterning"
					/>
				)}{" "}
				Players
			</div>
		</div>
	);
};

export default GameCard;
