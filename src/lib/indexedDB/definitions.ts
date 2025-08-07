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
	id?: string;
	date?: string;
	weekNumber?: number;
	dayNumber: TDayNumber;
	dayAbbreviation: TDayAbbreviation;
	sets: number[];
	grips?: TGrip[];
	trainingSet?: number;
};
