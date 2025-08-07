import type { WorkoutLoadData } from './types';

export const initialWorkoutData: WorkoutLoadData[] = [
	{
		currentDay: 1,
		workoutData: {
			day: 1,
			date: 0,
			name: 'Five Maximum Effort Sets',
			abbreviation: '5MES',
			sets: [],
			totalReps: 0,
			completed: false
		},
		canStart: false
	},
	{
		currentDay: 2,
		workoutData: {
			day: 2,
			date: 0,
			name: 'Pyramid',
			abbreviation: 'PYRA',
			sets: [],
			completed: false
		},
		canStart: false
	},
	{
		currentDay: 3,
		workoutData: {
			day: 3,
			date: 0,
			name: 'Three Sets Three Grips',
			abbreviation: '3S3G',
			trainingSetReps: 0,
			sets: [],
			completed: false,
			grips: []
		},
		canStart: false
	},
	{
		currentDay: 4,
		workoutData: {
			day: 4,
			date: 0,
			name: 'Maximum Training Sets',
			abbreviation: 'MXTS',
			trainingSetReps: 0,
			sets: [],
			completed: false
		},
		canStart: false
	},
	{
		currentDay: 5,
		workoutData: {
			day: 5,
			date: 0,
			name: 'Repeat Your Hardest Day',
			abbreviation: 'RYHD',
			selectedDay: undefined,
			workoutData: undefined,
			completed: false
		},
		canStart: false
	}
];
