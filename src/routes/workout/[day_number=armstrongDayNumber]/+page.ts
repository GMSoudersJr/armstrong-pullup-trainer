import type { PageLoad, EntryGenerator } from './$types';
import type { WorkoutLoadData } from '$lib/types';
import { initialWorkoutData } from '$lib/initialWorkoutData';

export const load: PageLoad = async ({ params }): Promise<WorkoutLoadData> => {
	const currentDay = Number.parseInt(params.day_number);

	const workoutData = initialWorkoutData.filter((data) => {
		return data.currentDay === currentDay;
	})[0];

	return workoutData;
};

export const entries: EntryGenerator = () => {
	return [
		{ day_number: '1' },
		{ day_number: '2' },
		{ day_number: '3' },
		{ day_number: '4' },
		{ day_number: '5' }
	];
};

export const prerender = true;
