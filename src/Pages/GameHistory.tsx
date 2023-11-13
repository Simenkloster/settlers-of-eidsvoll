import GameCard from "../Components/GameCard";
import useGames from "../Hooks/useGames";

const GameHistory = () => {
	const games = useGames();

	console.log(games);

	return (
		<div>
			{games.games.map((game) => (
				<GameCard game={game} />
			))}
		</div>
	);
};

export default GameHistory;
