import Player from "../Types/Player";

const ValidateGame = (
	list: Array<{ spiller: string; poeng: number }>,
	players: Player[]
): boolean => {
	let winningPlayerCount = 0;
	const navn = new Set<string>();

	for (const item of list) {
		if (!item.spiller) {
			console.log("ingen spiller fylt ut");
			return false;
		}
		if (!item.poeng) {
			console.log("ingen poeng fylt ut");
			return false;
		}
	}

	for (const item of list) {
		if (navn.has(item.spiller.toLowerCase())) {
			console.log("duplikat navn i listen");
			return false;
		}
		navn.add(item.spiller.toLowerCase());
		if (item.poeng > 11 || item.poeng < 2) {
			console.log("poeng utenfor gyldig område");
			return false;
		}
		if (item.poeng === 10 || item.poeng === 11) {
			winningPlayerCount++;
		}
		if (!players.find((player) => player.name === item.spiller.toLowerCase())) {
			console.log("spiller ikke funnet blant gyldige spillere");
			return false;
		}
		if (!players.find((player) => player.name === item.spiller.toLowerCase())) {
			console.log("spiller ikke funnet blant gyldige spillere");
			return false;
		}
	}

	if (winningPlayerCount != 1) {
		console.log("feil antall vinnere");
		return false;
	}

	return true;
};

export default ValidateGame;
