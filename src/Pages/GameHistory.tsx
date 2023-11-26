import GameCard from "../Components/GameCard";
import useGames from "../Hooks/useGames";

const GameHistory = () => {
	const games = useGames().games.slice();

	return (
		<div>
			{games.reverse().map((game, index) => (
				<GameCard key={index} game={game} />
			))}
		</div>
	);
};

export default GameHistory;
