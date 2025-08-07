import type {
	ArmstongDayAbbreviation,
	ArmstongDayName,
	ArmstrongDayNumber
} from './types';
import {
	DAY_1_WORKOUT_STATE,
	DAY_2_WORKOUT_STATE,
	type Day1WorkoutState,
	type Day2WorkoutState,
	type Day3WorkoutState,
	type Day4WorkoutState
} from './workoutStates';

class BaseWorkoutDay {
	isComplete: boolean = $state(false);
	date?: string;
	dayNumber: ArmstrongDayNumber;
	abbreviation?: ArmstongDayAbbreviation;
	state?:
		| Day1WorkoutState
		| Day2WorkoutState
		| Day3WorkoutState
		| Day4WorkoutState;
	recoveryTime: number;
	sets: number[];
	name: ArmstongDayName;

	constructor(
		dayNumber: ArmstrongDayNumber,
		name: ArmstongDayName,
		recoveryTime: number
	) {
		this.dayNumber = $state(dayNumber);
		this.sets = [];
		this.name = name;
		this.recoveryTime = recoveryTime;
	}

	addSet = (repCount: number) => {
		this.sets.push(repCount);
	};

	reset = () => {
		this.sets = [];
		this.isComplete = false;
	};

	getTotalReps = (): number => {
		return this.sets.reduce((total, reps) => total + reps, 0);
	};

	getWorkoutSummary = () => {
		return `${this.name}: ${this.getTotalReps()} total reps in ${this.sets.length} sets`;
	};
}

// Day 1 Class
export class MaxEffortDay extends BaseWorkoutDay {
	targetSets: number;

	constructor() {
		super(1, 'Five Maximum Effort Sets', 90);
		this.targetSets = 5;
		this.state = $state(DAY_1_WORKOUT_STATE.REPPING_OUT);
	}

	canAddSet(): boolean {
		return this.sets.length < this.targetSets;
	}

	getRecoveryTime = (): number => {
		return this.recoveryTime;
	};

	removeSet(): void {
		this.sets.pop();
	}

	updateState = (state: Day1WorkoutState): void => {
		this.state = state;
	};

	getInstructions() {
		return [
			'Perform 5 sets of pullups to failure',
			'Rest exactly 90 seconds between sets',
			'Focus on perfect form',
			'Record the number of reps for each set'
		];
	}
}

// Day 2 Class
export class PyramidDay extends BaseWorkoutDay {
	currentLevel: number;

	constructor() {
		super(2, 'Pyramid', 10);
		this.currentLevel = 1;
		this.state = DAY_2_WORKOUT_STATE.ASCENDING;
	}

	addPyramidSet = () => {
		this.addSet(this.currentLevel);
		this.currentLevel++;
	};

	getRecoveryTime = (): number => {
		return this.currentLevel * this.recoveryTime;
	};

	updateState = (state: Day2WorkoutState): void => {
		this.state = state;
	};

	getInstructions = (): string[] => {
		return [
			'Start with 1 pullup, rest 10 seconds',
			'Then 2 pullups, rest 20 seconds',
			'Continue adding 1 rep and 10 seconds rest',
			'When you fail to complete a set, rest 10 seconds per rep',
			'Do a final max out effort'
		];
	};
}

export class ThreeSetsThreeGrips extends BaseWorkoutDay {}
