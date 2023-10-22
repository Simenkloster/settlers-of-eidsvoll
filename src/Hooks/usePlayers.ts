import Player from "../Types/Player";
import { useEffect, useState } from "react";
import getPlayers from "../firebase/getPlayers";

function usePlayers() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;
		async function fetchPlayers() {
			try {
				const fetchedPlayers = await getPlayers();
				if (isMounted) {
					setPlayers(fetchedPlayers);
					setIsLoading(false);
				}
				setPlayers(fetchedPlayers);
			} catch (error) {
				console.log(error);
				if (isMounted) {
					setPlayers([]);
					setIsLoading(false);
				}
			}
		}

		fetchPlayers();

		return () => {
			isMounted = false;
		};
	}, []);

	return { players, isLoading };
}

export default usePlayers;
