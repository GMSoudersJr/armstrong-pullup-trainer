import type {
	ArmstongDayAbbreviation,
	ArmstongDayName,
	ArmstrongDayNumber,
	GripType
} from './types';
import { createMissedSetReps } from './utils';
import {
	DAY_1_WORKOUT_STATE,
	DAY_2_WORKOUT_STATE,
	DAY_3_WORKOUT_STATE,
	DAY_4_WORKOUT_STATE,
	DAY_5_WORKOUT_STATE,
	type Day1WorkoutState,
	type Day2WorkoutState,
	type Day3WorkoutState,
	type Day4WorkoutState,
	type Day5WorkoutState
} from './workoutStates';

export const ARMSTRONG_DAY_NAMES = {
	DAY_1: 'Five Maximum Effort Sets',
	DAY_2: 'Pyramid',
	DAY_3: 'Three Sets Three Grips',
	DAY_4: 'Maximum Training Sets',
	DAY_5: 'Repeat Your Hardest Day'
} satisfies Record<string, ArmstongDayName>;

export const ARMSTRONG_DAY_ABBREVIATIONS = {
	Day_0: 'SKPD',
	DAY_1: '5MES',
	DAY_2: 'PYRA',
	DAY_3: '3S3G',
	DAY_4: 'MXTS',
	DAY_5: 'RYHD'
} satisfies Record<string, ArmstongDayAbbreviation>;

class BaseWorkoutDay {
	isComplete = $state(false);
	date = $state<number | undefined>(undefined);
	sets = $state<number[]>([]);
	weekNumber = $state<number | undefined>(undefined);
	id = $state<string | undefined>(undefined);
	isRepeatDay = $state<boolean>(false);

	// These don't need to be reactive as they don't change after construction
	dayNumber: ArmstrongDayNumber;
	dayAbbreviation?: ArmstongDayAbbreviation;
	recoveryTime: number;
	name: ArmstongDayName;

	// State should be reactive
	state = $state<
		| Day1WorkoutState
		| Day2WorkoutState
		| Day3WorkoutState
		| Day4WorkoutState
		| Day5WorkoutState
		| undefined
	>(undefined);

	constructor(
		dayNumber: ArmstrongDayNumber,
		name: ArmstongDayName,
		recoveryTime: number,
		dayAbbreviation?: ArmstongDayAbbreviation
	) {
		this.dayNumber = dayNumber;
		this.name = name;
		this.recoveryTime = recoveryTime;
		this.dayAbbreviation = dayAbbreviation;
	}

	getSets = (): number[] => {
		return this.sets;
	};

	reset() {
		this.sets.length = 0; // More efficient than reassigning
		this.isComplete = false;
		this.date = undefined;
		this.isRepeatDay = false;
	}

	getTotalReps = (): number => {
		return this.sets.reduce((total, reps) => total + reps, 0);
	};

	getWorkoutSummary = (): string => {
		return `${this.name}: ${this.getTotalReps()} total reps in ${this.sets.length} sets`;
	};

	setAsRepeatDay = (value: boolean): void => {
		this.isRepeatDay = value;
		this.dayNumber = 5;
	};

	// Mark workout as complete
	markComplete = (): void => {
		this.isComplete = true;
		this.date = Date.now();
	};

	getWorkoutDate = (): number => {
		if (this.date) {
			return this.date;
		} else {
			throw new Error('no date set');
		}
	};

	setWeekNumber = (weekNumber: number): void => {
		this.weekNumber = weekNumber;
	};

	getDayNumber = (): ArmstrongDayNumber => {
		if (this.dayNumber) {
			return this.dayNumber;
		} else {
			throw new Error('no day number set');
		}
	};

	getWeekNumber = (): number => {
		if (this.weekNumber) {
			return this.weekNumber;
		} else {
			throw new Error('no week number set');
		}
	};

	setId = (): void => {
		this.id = `${this.getWeekNumber()}-${this.getDayNumber()}`;
	};

	getId = (): string => {
		if (this.id) {
			return this.id;
		} else {
			throw new Error('no id set');
		}
	};

	getRecoveryTime = () => {
		if (this.dayAbbreviation === 'PYRA') {
			return this.sets[this.sets.length - 1] * this.recoveryTime;
		} else {
			return this.recoveryTime;
		}
	};
}

// Day 1: Five Maximum Effort Sets
export class MaxEffortDay extends BaseWorkoutDay {
	targetSets: number;

	constructor() {
		super(1, ARMSTRONG_DAY_NAMES.DAY_1, 90, ARMSTRONG_DAY_ABBREVIATIONS.DAY_1);
		this.targetSets = 5;
		this.state = DAY_1_WORKOUT_STATE.REPPING_OUT;
	}

	canAddSet(): boolean {
		return this.sets.length < this.targetSets && !this.isComplete;
	}

	removeSet = (): void => {
		if (this.sets.length > 0) {
			this.sets.pop();
		}
	};

	updateState = (state: Day1WorkoutState): void => {
		this.state = state;
	};

	// Auto-complete when target sets reached
	addSet = (repCount: number) => {
		this.sets.push(repCount);
		if (this.sets.length >= this.targetSets) {
			this.markComplete();
			this.updateState(DAY_1_WORKOUT_STATE.COMPLETE);
		}
	};
}

// Day 2: Pyramid Training
export class PyramidDay extends BaseWorkoutDay {
	currentLevel = $derived(this.sets.length + 1);
	missedSetReps: number[] = $state([]);

	constructor() {
		super(2, ARMSTRONG_DAY_NAMES.DAY_2, 10, ARMSTRONG_DAY_ABBREVIATIONS.DAY_2);
		this.state = DAY_2_WORKOUT_STATE.REPPING_OUT;
	}

	addReppingOutSet = () => {
		this.sets.push(this.currentLevel);
	};

	setMissedSetReps = (): void => {
		this.missedSetReps = createMissedSetReps(this.currentLevel);
	};

	getMissedSetReps = (): number[] => {
		return this.missedSetReps;
	};

	addMissedSetSet = (repCount: number) => {
		this.currentLevel = repCount;
		this.sets.push(this.currentLevel);
		this.updateState(DAY_2_WORKOUT_STATE.MAX_OUT);
	};

	addMaxOutSet = (repCount: number): void => {
		this.sets.push(repCount);
		this.updateState(DAY_2_WORKOUT_STATE.COMPLETE);
		this.markComplete();
	};

	updateState = (state: Day2WorkoutState): void => {
		this.state = state;
	};

	reset = () => {
		super.reset();
		this.currentLevel = 1;
		this.state = DAY_2_WORKOUT_STATE.REPPING_OUT;
	};
}

// Day 3: Three Sets with Three Different Grips
export class ThreeSetsThreeGripsDay extends BaseWorkoutDay {
	selectedGrips: GripType[] = $state([]);
	grips: GripType[] = ['wide', 'close', 'neutral', 'pronated', 'supinated'];
	targetSetsPerGrip = 3;
	totalSets = 9;
	trainingSet: number = $state(0);
	missedSetReps: number[] = $state([]);

	constructor() {
		super(3, ARMSTRONG_DAY_NAMES.DAY_3, 60, ARMSTRONG_DAY_ABBREVIATIONS.DAY_3);
		this.state = DAY_3_WORKOUT_STATE.TRAINING_SET_INPUT;
	}

	addGrip = (grip: GripType): void => {
		this.selectedGrips.push(grip);
		this.updateState(DAY_3_WORKOUT_STATE.REPPING_OUT);
	};

	getCurrentGrip = (): GripType | undefined => {
		return this.selectedGrips[this.selectedGrips.length - 1];
	};

	setTrainingSet = (trainingSet: number): void => {
		this.trainingSet = trainingSet;
		this.setMissedSetReps();
	};

	getTrainingSet = (): number => {
		return this.trainingSet;
	};

	setMissedSetReps = (): void => {
		this.missedSetReps = createMissedSetReps(this.trainingSet);
	};

	getMissedSetReps = (): number[] => {
		return this.missedSetReps;
	};

	shouldSelectNextGrip = (): boolean => {
		return this.sets.length % 3 === 0 && this.sets.length < 9;
	};

	addTrainingSet = (): void => {
		this.sets.push(this.trainingSet);
		if (this.sets.length === 9) {
			this.updateState(DAY_3_WORKOUT_STATE.COMPLETE);
			this.markComplete();
		} else if (this.sets.length % 3 === 0) {
			this.updateState(DAY_3_WORKOUT_STATE.GRIP_SELECTION);
		}
	};

	addMissedSet = (repCount: number): void => {
		this.sets.push(repCount);
		if (this.sets.length === 9) {
			this.updateState(DAY_3_WORKOUT_STATE.COMPLETE);
			this.markComplete();
		} else if (this.sets.length % 3 === 0) {
			this.updateState(DAY_3_WORKOUT_STATE.GRIP_SELECTION);
		} else {
			this.updateState(DAY_3_WORKOUT_STATE.REPPING_OUT);
		}
	};

	updateState = (state: Day3WorkoutState): void => {
		this.state = state;
	};

	getSelectedGrips = (): GripType[] => {
		return this.selectedGrips;
	};
}

// Day 4: Maximum Training Sets
export class MaxTrainingSetsDay extends BaseWorkoutDay {
	trainingSet = $state(0);
	missedSetReps: number[] = $state([]);

	constructor() {
		super(4, ARMSTRONG_DAY_NAMES.DAY_4, 60, ARMSTRONG_DAY_ABBREVIATIONS.DAY_4);
		this.state = DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT;
	}

	setTrainingSet = (trainingSet: number) => {
		this.trainingSet = trainingSet;
		this.setMissedSetReps();
	};

	addTrainingSet = (): void => {
		this.sets.push(this.trainingSet);
	};

	addMissedSet = (repCount: number): void => {
		this.sets.push(repCount);
		this.updateState(DAY_4_WORKOUT_STATE.COMPLETE);
		this.markComplete();
	};

	getTrainingSet = (): number => {
		return this.trainingSet;
	};

	setMissedSetReps = (): void => {
		this.missedSetReps = createMissedSetReps(this.trainingSet);
	};

	getMissedSetReps = (): number[] => {
		return this.missedSetReps;
	};

	updateState = (state: Day4WorkoutState): void => {
		this.state = state;
	};
}

// Day 5: Repeat Your Hardest Day
export class RepeatYourHardestDay extends BaseWorkoutDay {
	constructor() {
		super(5, ARMSTRONG_DAY_NAMES.DAY_5, 0, ARMSTRONG_DAY_ABBREVIATIONS.DAY_5);
		this.state = DAY_5_WORKOUT_STATE.HARDEST_DAY_SELECTION;
	}
}

// Factory function to create workout days
export function createWorkoutDay(dayNumber: ArmstrongDayNumber) {
	switch (dayNumber) {
		case 1:
			return new MaxEffortDay();
		case 2:
			return new PyramidDay();
		case 3:
			return new ThreeSetsThreeGripsDay();
		case 4:
			return new MaxTrainingSetsDay();
		case 5:
			return new RepeatYourHardestDay();
		default:
			throw new Error(`Invalid day number: ${dayNumber}`);
	}
}

export class WorkoutToSave {
	id?: string;
	date?: number;
	weekNumber?: number;
	dayNumber: ArmstrongDayNumber;
	dayAbbreviation?: ArmstongDayAbbreviation;
	sets: number[];
	grips?: GripType[] | null;
	trainingSet?: number | null;

	constructor(
		workout:
			| MaxEffortDay
			| PyramidDay
			| ThreeSetsThreeGripsDay
			| MaxTrainingSetsDay
	) {
		this.id = workout.getId();
		this.date = workout.getWorkoutDate();
		this.weekNumber = workout.getWeekNumber();
		this.dayNumber = workout.getDayNumber();
		this.dayAbbreviation = workout.dayAbbreviation;
		this.sets = $state.snapshot(workout.getSets());
		if (workout instanceof ThreeSetsThreeGripsDay) {
			this.grips = workout.getSelectedGrips();
		} else {
			this.grips = null;
		}
		if (
			workout instanceof ThreeSetsThreeGripsDay ||
			workout instanceof MaxTrainingSetsDay
		) {
			this.trainingSet = workout.getTrainingSet();
		} else {
			this.trainingSet = null;
		}
	}
}
