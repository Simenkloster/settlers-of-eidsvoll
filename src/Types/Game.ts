import Player from "./Player";

type Game = {
	numberofplayers: number;
	date: string;
	result: Array<{ spiller: Player; poeng: number }>;
};

export default Game;
