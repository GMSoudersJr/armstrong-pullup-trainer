import type {
	ArmstongDayAbbreviation,
	ArmstrongDayNumber,
	GripType
} from '$lib/types';

export type TStoreName = 'weeksStore' | 'workoutsStore';

export type TWeek = {
	number: number;
	lastCompletedDay: number;
	completedDays: number[];
};

export type TGetWorkoutById = {
	getWorkoutById: string;
};

export type TGetWorkoutsByWeekNumber = {
	getWorkoutsByWeekNumber: number;
};

export type TGetWorkoutsByDayNumber = {
	getWorkoutsByDayNumber: number;
};

export type TDataToGet = {
	getWorkoutById?: string;
	getWorkoutsByWeekNumber?: number;
	getWorkoutsByDayNumber?: number;
};

export type TDayAbbreviation =
	| '5MES'
	| 'PYRA'
	| '3S3G'
	| 'MXTS'
	| 'SKPD'
	| 'RYHD';

export type TGrip =
	| 'neutral'
	| 'wide'
	| 'close'
	| 'pronated'
	| 'supinated'
	| string;

export type TDayNumber = 1 | 2 | 3 | 4 | 5;

export type TDayComplete = {
	id: string;
	date: number;
	weekNumber: number;
	dayNumber: ArmstrongDayNumber;
	dayAbbreviation: ArmstongDayAbbreviation;
	sets: number[];
	grips?: GripType[];
	trainingSet?: number;
};

export const schema = {
	stores: [
		{
			name: 'workoutsStore',
			keyPath: 'id',
			indexes: [
				{
					name: 'trainingSetRepsIDX',
					keyPath: 'trainingSetReps',
					options: { unique: false }
				},
				{
					name: 'weekNumberIDX',
					keyPath: 'weekNumber',
					options: { unique: false }
				},
				{
					name: 'dayNumberIDX',
					keyPath: 'dayNumber',
					options: { unique: false }
				}
			]
		},
		{
			name: 'weeksStore',
			keyPath: 'number',
			indexes: [
				{
					name: 'lastCompletedDayIDX',
					keyPath: 'lastCompletedDay',
					options: { unique: false }
				}
			]
		}
	]
};
