export const ToNameCase = (name: string): string => {
	const splitName = name.split(" ");
	const nameCase = splitName.map((name) => {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	});
	return nameCase.join(" ");
};
