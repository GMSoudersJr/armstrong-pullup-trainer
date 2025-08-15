import { setContext, getContext } from 'svelte';
import type { TDayComplete } from './indexedDB/definitions';
import {
	MaxEffortDay,
	MaxTrainingSetsDay,
	PyramidDay,
	ThreeSetsThreeGripsDay
} from './workoutClasses.svelte';

const WORKOUT_KEY = Symbol('workout');
export type ArmstongWorkoutDay =
	| MaxEffortDay
	| PyramidDay
	| MaxTrainingSetsDay
	| ThreeSetsThreeGripsDay;

export function setWorkoutContext(workout: ArmstongWorkoutDay) {
	setContext(WORKOUT_KEY, workout);
}

export function getWorkoutContext(): ArmstongWorkoutDay {
	return getContext(WORKOUT_KEY);
}
