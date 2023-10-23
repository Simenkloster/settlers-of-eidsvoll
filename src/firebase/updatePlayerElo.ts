import { playersRef } from "./firebase";
import Player from "../Types/Player";

const updatePlayerElo = (player: Player, newElo: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		playersRef
			.orderByChild("name")
			.equalTo(player.name)
			.once("value")
			.then((snapshot) => {
				if (snapshot.exists()) {
					const playerID = Object.keys(snapshot.val())[0];
					playersRef.child(playerID).update({ elo: newElo }, (error) => {
						if (error) {
							reject(error);
						} else {
							console.log("Player elo updated");
							resolve();
						}
					});
				} else {
					reject("Player not found");
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default updatePlayerElo;
