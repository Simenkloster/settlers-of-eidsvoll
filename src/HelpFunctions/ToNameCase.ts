export const ToNameCase = (name: string): string => {
	let trimmedName = name.trim();
	const splitName = trimmedName.split(" ");
	const nameCase = splitName.map((name) => {
		console.log(name);
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	});
	return nameCase.join(" ");
};
