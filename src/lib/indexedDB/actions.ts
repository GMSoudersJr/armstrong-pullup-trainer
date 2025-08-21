import type { TDayComplete, TWeek, TStoreName } from './definitions';
import { getDB } from './index';
import type { WorkoutToSave } from '$lib/workoutClasses.svelte';

// ADD_NEW_WEEK {{{
export async function addNewWeek(weekNumber: number) {
	const weekData: TWeek = {
		number: weekNumber,
		lastCompletedDay: 0,
		completedDays: []
	};

	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readwrite');
	const store = transaction.objectStore('weeksStore');
	const request = store.add(weekData);

	request.onerror = (err) => {
		console.warn('error adding new week', err);
	};
}
//}}}

// GET_OVERALL_PROGESS {{{
export async function getOverallProgess(): Promise<TDayComplete[]> {
	const db = await getDB();
	const transaction = db.transaction('workoutsStore', 'readonly');
	const objectStore = transaction.objectStore('workoutsStore');
	const getAllWorkoutsRequest = objectStore.getAll();

	return new Promise((resolve, reject) => {
		getAllWorkoutsRequest.onerror = () => reject(getAllWorkoutsRequest.error);
		transaction.oncomplete = () => {
			resolve(getAllWorkoutsRequest.result);
		};
	});
}
// }}}

// GET_WEEKLY_PROGESS {{{
export async function getWeeklyProgress(): Promise<TWeek[]> {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	const getAllWeeklyData = objectStore.getAll();

	return new Promise((resolve, reject) => {
		getAllWeeklyData.onerror = () => reject(getAllWeeklyData.error);
		transaction.oncomplete = () => {
			resolve(getAllWeeklyData.result);
		};
	});
}
// }}}

// GET_WORKOUTS_BY_WEEK_NUMBER {{{
export async function getWorkoutsbyWeekNumber(
	weekNumber: number
): Promise<TDayComplete[]> {
	const db = await getDB();
	const transaction = db.transaction('workoutsStore', 'readonly');
	const objectStore = transaction.objectStore('workoutsStore');
	let index = objectStore.index('weekNumberIDX');

	const request = index.getAll(weekNumber);

	return new Promise<TDayComplete[]>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		transaction.oncomplete = () => {
			resolve(request.result);
		};
	});
}
//}}}

// GET_WORKOUT_BY_ID {{{
export async function getWorkoutById(id: string): Promise<TDayComplete[]> {
	const db = await getDB();
	const transaction = db.transaction('workoutsStore', 'readonly');
	const objectStore = transaction.objectStore('workoutsStore');
	const request = objectStore.get(id);

	return new Promise<TDayComplete[]>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		transaction.oncomplete = () => {
			resolve([request.result]);
		};
	});
}
//}}}

// GET_WEEK_DATA {{{
export async function getWeekDataForWeekNumber(
	weekNumber: number
): Promise<TWeek> {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	const request = objectStore.get(weekNumber);

	return new Promise<TWeek>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		transaction.oncomplete = () => {
			resolve(request.result);
		};
	});
}
//}}}

// UPDATE_WEEK {{{
export async function updateThisWeekWithWorkoutNumber(
	week: TWeek,
	workoutDayNumber: number
) {
	const updatedWeekData: TWeek = {
		number: week.number,
		completedDays: [...week.completedDays, workoutDayNumber],
		lastCompletedDay: workoutDayNumber
	};

	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readwrite');
	const objectStore = transaction.objectStore('weeksStore');
	const serialized = JSON.parse(JSON.stringify(updatedWeekData));
	const request = objectStore.put(serialized);

	request.onerror = (err) => console.warn(err);
}
//}}}

// ADD_COMPLETED_DAY {{{
export const addCompletedDayToWorkoutsStore = async (
	payload: WorkoutToSave
): Promise<boolean> => {
	const db = await getDB();
	const transaction = db.transaction('workoutsStore', 'readwrite');
	const objectStore = transaction.objectStore('workoutsStore');
	const serialized = JSON.parse(JSON.stringify(payload));
	const request = objectStore.put(serialized);

	return new Promise<boolean>((resolve, reject) => {
		request.onerror = (err) => reject(err);
		request.onsuccess = () => resolve(true);
	});
};
//}}}

// GET_CURRENT_WEEK_NUMBER {{{
export const getCurrentWeekNumber = async (): Promise<number> => {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	const request = objectStore.getAllKeys();

	return new Promise<number>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		transaction.oncomplete = () => {
			if (request.result.length === 0) resolve(0);
			resolve(Number(request.result.at(-1)));
		};
	});
};
//}}}

// GET_WORKOUTS_BY_DAY_NUMBER {{{
export async function getWorkoutsByDayNumber(
	dayNumber: number
): Promise<TDayComplete[]> {
	const db = await getDB();
	const transaction = db.transaction('workoutsStore', 'readonly');
	const objectStore = transaction.objectStore('workoutsStore');
	let index = objectStore.index('dayNumberIDX');
	let request = index.getAll(dayNumber);

	return new Promise<TDayComplete[]>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}
//}}}

// GET_INCOMPLETE_WEEK {{{
export async function getIncompleteWeek(): Promise<TWeek[]> {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	let range = IDBKeyRange.upperBound(5, true);
	let index = objectStore.index('lastCompletedDayIDX');
	let request = index.getAll(range);

	return new Promise<TWeek[]>((resolve, reject) => {
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
}
//}}}

// SHOULD_START_NEW_WEEK? {{{
export const shouldStartNewWeek = async (): Promise<boolean> => {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	const allWeeksRequest = objectStore.count();

	return new Promise<boolean>((resolve, reject) => {
		allWeeksRequest.onerror = () => reject(allWeeksRequest.error);

		let range = IDBKeyRange.only(5);
		const lastCompletedDayIDX = objectStore.index('lastCompletedDayIDX');
		const completeWeeksRequest = lastCompletedDayIDX.count(range);
		completeWeeksRequest.onerror = () => reject(completeWeeksRequest.error);

		transaction.oncomplete = () => {
			resolve(allWeeksRequest.result === completeWeeksRequest.result);
		};
	});
};
//}}}

// GET_LAST_COMPLETED_DAY {{{
export const getLastCompletedDay = async (): Promise<number> => {
	const db = await getDB();
	const transaction = db.transaction('weeksStore', 'readonly');
	const objectStore = transaction.objectStore('weeksStore');
	let range = IDBKeyRange.upperBound(4, false);
	const lastCompletedDayIDX = objectStore.index('lastCompletedDayIDX');
	const lastCompletedDayRequest: IDBRequest<TWeek[]> =
		lastCompletedDayIDX.getAll(range);

	return new Promise<number>((resolve, reject) => {
		lastCompletedDayRequest.onerror = () =>
			reject(lastCompletedDayRequest.error);

		if (!lastCompletedDayRequest) return;
		transaction.oncomplete = () => {
			if (
				lastCompletedDayRequest.result === undefined ||
				lastCompletedDayRequest.result.length === 0
			) {
				resolve(0);
			} else {
				resolve(lastCompletedDayRequest.result[0].lastCompletedDay);
			}
		};
	});
};
//}}}
