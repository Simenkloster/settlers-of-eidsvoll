import Team from "../Types/Team";
import { useState, useEffect } from "react";
import getTeams from "../firebase/getTeams";

function useTeams() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;
		async function fetchTeams() {
			try {
				const fetchedPlayers = await getTeams();
				if (isMounted) {
					setTeams(fetchedPlayers);
					setIsLoading(false);
				}
				setTeams(fetchedPlayers);
			} catch (error) {
				console.log(error);
				if (isMounted) {
					setTeams([]);
					setIsLoading(false);
				}
			}
		}

		fetchTeams();

		return () => {
			isMounted = false;
		};
	}, []);

	return { teams, isLoading };
}

export default useTeams;
