export function getRecoveryTime(day?: number): number {
	let result: number = 0;

	switch (day) {
		case 1:
			result = 90;
			break;
		case 2:
			result = 10;
			break;
		case 3:
			result = 60;
			break;
		case 4:
			result = 60;
			break;
		default:
			result = 0;
			break;
	}

	return result;
}

export function createMissedSetReps(set: number | number[]): number[] {
	if (Array.isArray(set)) return [0].concat(set);

	const result: number[] = [];
	for (let i = 0; i < set; i++) {
		result.push(i);
	}

	return result;
}
