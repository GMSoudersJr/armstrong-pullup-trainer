import type {Day1WorkoutState, Day2WorkoutState, Day3WorkoutState, Day4WorkoutState} from "./workoutStates";

class Workout {
	showTimer: boolean = $state(false);
	complete: boolean = $state(false);
	number: number;
	state?: Day1WorkoutState | Day2WorkoutState | Day3WorkoutState | Day4WorkoutState
	sets?: number[];
	trainingSets?: number;

	constructor(number: number) {
		this.number = $state(number);

	}
}
