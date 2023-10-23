import { playersRef } from "./firebase";
import Player from "../Types/Player";

const makePlayerPromise = (name: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		playersRef
			.push({ name: name.toLowerCase(), elo: 1000 } as Player)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default makePlayerPromise;
