import Player from "../Types/Player";
import Game from "../Types/Game";

export function CalculatePointsPerGame(player: Player, games: Game[]): number {
	const totalGames = games.filter((game) =>
		game.result.find(
			(playerInGame) => playerInGame.spiller.name === player.name
		)
	).length;

	const combinesPoints = games
		.filter((game) =>
			game.result.find(
				(playerInGame) => playerInGame.spiller.name === player.name
			)
		)
		.reduce((totalPoints, game) => {
			const points = game.result.find(
				(playerInGame) => playerInGame.spiller.name === player.name
			)?.poeng;
			return totalPoints + points!;
		}, 0);

	return combinesPoints / totalGames;
}
