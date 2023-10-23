import { gamesRef } from "./firebase";
import Game from "../Types/Game";

const getGames = (): Promise<Game[]> => {
	return new Promise((resolve, reject) => {
		gamesRef.on(
			"value",
			(snapshot) => {
				const games: Game[] = [];
				snapshot.forEach((game) => {
					games.push(game.val() as Game);
				});
				resolve(games);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

export default getGames;
