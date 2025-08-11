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

class BaseWorkoutDay {
	isComplete = $state(false);
	date = $state<string | undefined>(undefined);
	sets = $state<number[]>([]);

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

	reset = () => {
		this.sets.length = 0; // More efficient than reassigning
		this.isComplete = false;
		this.date = undefined;
	};

	getTotalReps = (): number => {
		return this.sets.reduce((total, reps) => total + reps, 0);
	};

	getWorkoutSummary = () => {
		return `${this.name}: ${this.getTotalReps()} total reps in ${this.sets.length} sets`;
	};

	// Mark workout as complete
	markComplete = () => {
		this.isComplete = true;
		this.date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
	};
}

// Day 1: Five Maximum Effort Sets
export class MaxEffortDay extends BaseWorkoutDay {
	targetSets: number;

	constructor() {
		super(1, 'Five Maximum Effort Sets', 90, '5MES');
		this.targetSets = 5;
		this.state = DAY_1_WORKOUT_STATE.REPPING_OUT;
	}

	canAddSet(): boolean {
		return this.sets.length < this.targetSets && !this.isComplete;
	}

	getRecoveryTime = (): number => {
		return this.recoveryTime;
	};

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
		super(2, 'Pyramid', 10, 'PYRA');
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

	addMaxOutSet = (repCount: number) => {
		this.sets.push(repCount);
		this.updateState(DAY_2_WORKOUT_STATE.COMPLETE);
	};

	getRecoveryTime = (): number => {
		return this.currentLevel * this.recoveryTime;
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
export class ThreeSetsThreeGrips extends BaseWorkoutDay {
	selectedGrips: GripType[] = $state([]);
	grips: GripType[] = ['wide', 'close', 'neutral', 'pronated', 'supinated'];
	targetSetsPerGrip = 3;
	totalSets = 9;
	trainingSet: number = $state(0);
	missedSetReps: number[] = $state([]);

	constructor() {
		super(3, 'Three Sets Three Grips', 60, '3S3G');
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
		} else if (this.sets.length % 3 === 0) {
			this.updateState(DAY_3_WORKOUT_STATE.GRIP_SELECTION);
		}
	};

	addMissedSet = (repCount: number): void => {
		this.sets.push(repCount);
	};

	updateState = (state: Day3WorkoutState): void => {
		this.state = state;
	};
}

// Day 4: Maximum Training Sets
export class MaxTrainingSets extends BaseWorkoutDay {
	trainingSet = $state(0);
	missedSetReps: number[] = $state([]);

	constructor() {
		super(4, 'Maximum Training Sets', 60, 'MXTS');
		this.state = DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT;
	}

	setTrainingSet = (trainingSet: number) => {
		this.trainingSet = trainingSet;
		this.setMissedSetReps();
	};

	addSet = () => {
		this.sets.push(this.trainingSet);
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
		super(5, 'Repeat Your Hardest Day', 0, 'RYHD');
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
			return new ThreeSetsThreeGrips();
		case 4:
			return new MaxTrainingSets();
		case 5:
			return new RepeatYourHardestDay();
		default:
			throw new Error(`Invalid day number: ${dayNumber}`);
	}
}
