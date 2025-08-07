import { setContext, getContext } from 'svelte';
import type { TDayComplete } from './indexedDB/definitions';

const WORKOUT_KEY = Symbol('workout');

export function setWorkoutContext(workout: TDayComplete) {
	setContext(WORKOUT_KEY, workout);
}

export function getWorkoutContext(): TDayComplete {
	return getContext(WORKOUT_KEY);
}
