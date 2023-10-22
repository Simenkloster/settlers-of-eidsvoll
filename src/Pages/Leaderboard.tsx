import LeaderboardTable from "../Components/LeaderboardTable";
import usePlayers from "../Hooks/usePlayers";

const Leaderboard = () => {
	const { players, isLoading } = usePlayers();

	return (
		<div>
			{isLoading ? <h1>Loading</h1> : <LeaderboardTable players={players} />}
		</div>
	);
};

export default Leaderboard;
