import type { PageLoad } from './$types';
import type { WorkoutLoadData } from '$lib/types';
import { mockData } from '$lib';
import { initialWorkoutData } from '$lib/initialWorkoutData';

export const load: PageLoad = async (): Promise<WorkoutLoadData> => {
	// TODO get the current day and week from IndexedDB
	async function getCurrentDay() {
		return mockData.currentDay;
	}

	const currentDay = await getCurrentDay();

	const workoutData = initialWorkoutData.filter( data => {
		return data.currentDay === currentDay;
	})[0];

	return workoutData;
	;
};
