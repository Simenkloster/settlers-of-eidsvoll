import Player from "./Player";

type Game = {
	numberofplayers: number;
	date: Date;
	result: Array<{ spiller: Player; poeng: number }>;
};

export default Game;
