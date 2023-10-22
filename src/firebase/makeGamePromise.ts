import { gamesRef } from "./firebase";
import Game from "../Types/Game";

const makeGamePromise = (game: Game): Promise<void> => {
	return new Promise((resolve, reject) => {
		gamesRef
			.push(game)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default makeGamePromise;
