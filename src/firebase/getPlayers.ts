import { playersRef } from "./firebase";
import Player from "../Types/Player";

const getPlayers = (): Promise<Player[]> => {
	return new Promise((resolve, reject) => {
		playersRef.on(
			"value",
			(snapshot) => {
				const players: Player[] = [];
				snapshot.forEach((player) => {
					players.push(player.val() as Player);
				});
				resolve(players);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

export default getPlayers;
