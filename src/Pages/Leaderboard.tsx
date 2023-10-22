import LeaderboardTable from "../Components/LeaderboardTable";
import usePlayers from "../Hooks/usePlayers";

const Leaderboard = () => {
	const { players, isLoading } = usePlayers();

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			{isLoading ? <h1>Loading</h1> : <LeaderboardTable players={players} />}
		</div>
	);
};

export default Leaderboard;
