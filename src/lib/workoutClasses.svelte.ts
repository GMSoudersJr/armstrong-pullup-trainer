import type {
	ArmstongDayAbbreviation,
	ArmstongDayName,
	ArmstrongDayNumber,
	GripType
} from './types';
import {
	DAY_1_WORKOUT_STATE,
	DAY_2_WORKOUT_STATE,
	DAY_3_WORKOUT_STATE,
	DAY_4_WORKOUT_STATE,
	type Day1WorkoutState,
	type Day2WorkoutState,
	type Day3WorkoutState,
	type Day4WorkoutState
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

	constructor() {
		super(2, 'Pyramid', 10, 'PYRA');
		this.state = DAY_2_WORKOUT_STATE.REPPING_OUT;
	}

	addReppingOutSet = () => {
		this.sets.push(this.currentLevel);
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
	currentGripIndex = $state(0);
	grips: GripType[] = ['wide', 'close', 'neutral', 'pronated', 'supinated'];
	targetSetsPerGrip = 3;

	constructor() {
		super(3, 'Three Sets Three Grips', 60, '3S3G');
		this.state = DAY_3_WORKOUT_STATE.TRAINING_SET_INPUT;
	}

	getCurrentGrip = (): string => {
		return this.grips[this.currentGripIndex];
	};

	getSetsForCurrentGrip = (): number => {
		const setsPerGrip = this.targetSetsPerGrip;
		const startIndex = this.currentGripIndex * setsPerGrip;
		return this.sets.slice(startIndex, startIndex + setsPerGrip).length;
	};

	canAddSet = (): boolean => {
		return (
			this.getSetsForCurrentGrip() < this.targetSetsPerGrip && !this.isComplete
		);
	};

	addSet = (repCount: number) => {
		this.sets.push(repCount);
	};

	updateState = (state: Day3WorkoutState): void => {
		this.state = state;
	};
}

// Day 4: Maximum Training Sets
export class MaxTrainingSets extends BaseWorkoutDay {
	trainingSet = $state(0);

	constructor() {
		super(4, 'Maximum Training Sets', 60, 'MXTS');
		this.state = DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT;
	}

	setTrainingSet = (trainingSet: number) => {
		this.trainingSet = trainingSet;
	};

	addSet = () => {
		super.addSet(this.trainingSet);
	};

	updateState = (state: Day4WorkoutState): void => {
		this.state = state;
	};
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
		default:
			throw new Error(`Invalid day number: ${dayNumber}`);
	}
}
