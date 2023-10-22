import Player from "../Types/Player";
import Game from "../Types/Game";
import TestPlayers from "./TestPlayers";

var TestGames: Game[] = [
	{
		numberofplayers: 2,
		date: new Date(2020, 1, 1),
		result: [
			[TestPlayers[0], 1],
			[TestPlayers[1], 2],
			[TestPlayers[2], 2],
			[TestPlayers[3], 4],
		],
	},
	{
		numberofplayers: 2,
		date: new Date(2020, 1, 2),
		result: [
			[TestPlayers[1], 1],
			[TestPlayers[2], 2],
			[TestPlayers[3], 3],
			[TestPlayers[4], 4],
		],
	},
	{
		numberofplayers: 2,
		date: new Date(2020, 1, 3),
		result: [
			[TestPlayers[2], 1],
			[TestPlayers[3], 2],
			[TestPlayers[4], 3],
			[TestPlayers[0], 4],
		],
	},
	{
		numberofplayers: 2,
		date: new Date(2020, 1, 4),
		result: [
			[TestPlayers[3], 1],
			[TestPlayers[4], 2],
			[TestPlayers[0], 3],
			[TestPlayers[1], 4],
		],
	},
];
