export const WORKOUT_STATES = {
	REPPING_OUT: 'repping_out',
	COMPLETE: 'complete',
	TRAINING_SET_INPUT: 'training_set_input',
	MISSED_SET: 'missed_set',
	GRIP_SELECTION: 'grip_selection',
	MAX_OUT: 'max_out',
	HARDEST_DAY_SELECTION: 'hardest_day_selection'
} as const;

export type BaseWorkoutState = 'repping_out' | 'complete';
export type AllWorkoutStates =
	| 'repping_out'
	| 'complete'
	| 'training_set_input'
	| 'missed_set'
	| 'grip_selection'
	| 'complete';
export type Day1WorkoutState = 'repping_out' | 'complete';
export type Day2WorkoutState =
	| 'repping_out'
	| 'missed_set'
	| 'max_out'
	| 'complete';
export type Day3WorkoutState =
	| 'training_set_input'
	| 'missed_set'
	| 'grip_selection'
	| 'complete'
	| 'repping_out';
export type Day4WorkoutState =
	| 'training_set_input'
	| 'missed_set'
	| 'complete'
	| 'repping_out';
export type Day5WorkoutState = 'hardest_day_selection' | 'complete';

export const DAY_1_WORKOUT_STATE = {
	REPPING_OUT: WORKOUT_STATES.REPPING_OUT,
	COMPLETE: WORKOUT_STATES.COMPLETE
} satisfies Record<string, Day1WorkoutState>;

export const DAY_2_WORKOUT_STATE = {
	REPPING_OUT: WORKOUT_STATES.REPPING_OUT,
	MISSED_SET: WORKOUT_STATES.MISSED_SET,
	MAX_OUT: WORKOUT_STATES.MAX_OUT,
	COMPLETE: WORKOUT_STATES.COMPLETE
} satisfies Record<string, Day2WorkoutState>;

export const DAY_3_WORKOUT_STATE = {
	TRAINING_SET_INPUT: WORKOUT_STATES.TRAINING_SET_INPUT,
	GRIP_SELECTION: WORKOUT_STATES.GRIP_SELECTION,
	REPPING_OUT: WORKOUT_STATES.REPPING_OUT,
	MISSED_SET: WORKOUT_STATES.MISSED_SET,
	COMPLETE: WORKOUT_STATES.COMPLETE
} satisfies Record<string, Day3WorkoutState>;

export const DAY_4_WORKOUT_STATE = {
	TRAINING_SET_INPUT: WORKOUT_STATES.TRAINING_SET_INPUT,
	REPPING_OUT: WORKOUT_STATES.REPPING_OUT,
	MISSED_SET: WORKOUT_STATES.MISSED_SET,
	COMPLETE: WORKOUT_STATES.COMPLETE
} satisfies Record<string, Day4WorkoutState>;

export const DAY_5_WORKOUT_STATE = {
	HARDEST_DAY_SELECTION: WORKOUT_STATES.HARDEST_DAY_SELECTION,
	COMPLETE: WORKOUT_STATES.COMPLETE
} satisfies Record<string, Day5WorkoutState>;

export function getStatesForDay(day: 1 | 2 | 3 | 4 | 5) {
	switch (day) {
		case 1:
			return DAY_1_WORKOUT_STATE;
		case 2:
			return DAY_2_WORKOUT_STATE;
		case 3:
			return DAY_3_WORKOUT_STATE;
		case 4:
			return DAY_4_WORKOUT_STATE;
		case 5:
			return DAY_5_WORKOUT_STATE;
		default:
			throw new Error(`invalid day: ${day}`);
	}
}
