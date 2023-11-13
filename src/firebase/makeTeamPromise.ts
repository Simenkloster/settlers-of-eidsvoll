import { teamsRef } from "./firebase";
import Team from "../Types/Team";

const makeTeamPromise = (team: Team): Promise<void> => {
	return new Promise((resolve, reject) => {
		teamsRef
			.push(team)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default makeTeamPromise;
