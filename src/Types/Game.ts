import Player from "./Player";

type Game = {
	numberofplayers: number;
	date: Date;
	result: Array<[player: Player, points: number]>;
};

export default Game;
