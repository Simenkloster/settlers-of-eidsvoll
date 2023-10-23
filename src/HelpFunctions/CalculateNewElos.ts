import react, { useState } from "react";
import Player from "../Types/Player";
import Game from "../Types/Game";
import EloCalculator from "./EloCalculator";

export const CalculateNewElos = (game: Game): Player[] => {
	const playerListWithUpdatedElos: Player[] = [];

	const result = game.result;

	//Sjekker alle mot alle bortsett fra seg selv, fordi Elo kun oppdateres for den som løkkes gjennom. Derfor gås alle par gjennom to ganer, en gang for hver spiller.

	for (let i = 0; i < result.length; i++) {
		var player: Player = result[i].spiller;
		var ratingChange: number = 0;
		for (let j = 0; j < result.length; j++) {
			if (j != i) {
				if (result[i].poeng > result[j].poeng) {
					ratingChange += EloCalculator(
						result[i].spiller,
						result[j].spiller,
						1
					);
				}
				if (result[i].poeng < result[j].poeng) {
					ratingChange += EloCalculator(
						result[i].spiller,
						result[j].spiller,
						0
					);
				}
				if (result[i].poeng == result[j].poeng) {
					ratingChange += EloCalculator(
						result[i].spiller,
						result[j].spiller,
						0.5
					);
				}
			}
		}
		playerListWithUpdatedElos.push({
			...player,
			elo: player.elo + ratingChange,
		});
	}

	return playerListWithUpdatedElos;
};
