import Team from "../Types/Team";
import { teamsRef } from "./firebase";

const getTeams = (): Promise<Team[]> => {
	return new Promise((resolve, reject) => {
		teamsRef.on(
			"value",
			(snapshot) => {
				const teams: Team[] = [];
				snapshot.forEach((team) => {
					teams.push(team.val() as Team);
				});
				resolve(teams);
			},
			(error) => {
				reject(error);
			}
		);
	});
};

export default getTeams;
