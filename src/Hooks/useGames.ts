import Game from "../Types/Game";
import { useEffect, useState } from "react";
import getGames from "../firebase/getGames";

function useGames() {
	const [games, setGames] = useState<Game[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;
		async function fetchGames() {
			try {
				const fetchedGames = await getGames();
				if (isMounted) {
					setGames(fetchedGames);
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
				if (isMounted) {
					setGames([]);
					setIsLoading(false);
				}
			}
		}

		fetchGames();

		return () => {
			isMounted = false;
		};
	}, []);

	return { games, isLoading };
}

export default useGames;
