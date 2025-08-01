import type {ArmstongDayAbbreviation} from "./types";
import type {Day1WorkoutState, Day2WorkoutState, Day3WorkoutState, Day4WorkoutState} from "./workoutStates";

class BaseWorkoutDay {
	isComplete: boolean = $state(false);
	date?: string;
	number: number;
	abbreviation?: ArmstongDayAbbreviation;
	state?: Day1WorkoutState | Day2WorkoutState | Day3WorkoutState | Day4WorkoutState
	sets?: number[];
	recoveryTime?: number;

	constructor(number: number) {
		this.number = $state(number);
	}


}
