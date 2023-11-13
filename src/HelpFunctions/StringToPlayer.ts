import Player from "../Types/Player";

const StringToPlayer = (string: string, players: Player[]): Player => {
	for (const item of players) {
		if (item.name.toLowerCase() === string.toLowerCase()) {
			return item;
		}
	}

	return {
		name: "ErrorPlayer",
		elo: 0,
	};
};

export default StringToPlayer;
