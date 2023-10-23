import Player from "../Types/Player";

export function EloCalculator(
	player: Player,
	opponent: Player,
	result: number
): number {
	const playerElo = player.elo;
	const opponentElo = opponent.elo;

	const E_a = 1 / (1 + 10 ** ((opponentElo - playerElo) / 400));

	const eloChange = 20 * (result - E_a);

	return eloChange;
}

export default EloCalculator;
