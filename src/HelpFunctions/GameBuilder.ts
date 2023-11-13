import Player from "../Types/Player";
import Game from "../Types/Game";
import StringToPlayer from "./StringToPlayer";

const GameBuilder = (
	numberofplayers: number,
	result: Array<{ spiller: string; poeng: number }>,
	players: Player[],
	ranked: boolean
): Game => {
	return {
		numberofplayers: numberofplayers,
		date: new Date(Date.now()).toISOString(),
		result: result.map((player) => {
			return {
				spiller: StringToPlayer(player.spiller, players),
				poeng: player.poeng,
			};
		}),
		ranked: ranked,
	};
};

export default GameBuilder;
