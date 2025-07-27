export type ArmstrongDay = 1 | 2 | 3 | 4 | 5;
export type ArmstongDayName = "Five Maximum Effort Sets" | "Pyramid" | "Three Grips With Three Sets" | "Maximum Training Sets" | "Repeat Your Hardest Day";
export type ArmstongDayAbbreviation = "5MES" | "PYRA" | "3G3S" | "MXTS" | "RYHD";

export interface BaseWorkout {
  day: ArmstrongDay;
  name: ArmstongDayName;
  abbreviation: ArmstongDayAbbreviation;
  date: string;
  completed: boolean;
}

export interface Day1Workout extends BaseWorkout {
  day: 1;
  name: "Five Maximum Effort Sets";
  abbreviation: "5MES";
  sets: number[];
  totalReps: number;
}

export interface Day2Workout extends BaseWorkout {
  day: 2;
  name: "Pyramid";
  abbreviation: "PYRA";
  sets: number[];
}

export interface Day3Workout extends BaseWorkout {
  day: 3;
  name: "Three Grips With Three Sets";
  abbreviation: "3G3S";
  trainingSetReps: number;
  sets: number[];
}

export interface Day4Workout extends BaseWorkout {
  day: 4;
  name: "Maximum Training Sets";
  abbreviation: "MXTS";
  trainingSetReps: number;
  sets: number[];
}

export interface Day5Workout extends BaseWorkout {
  day: 5;
  name: "Repeat Your Hardest Day";
  abbreviation: "RYHD";
  selectedDay?: 1 | 2 | 3 | 4; // which previous day to repeat
  workoutData?: Day1Workout | Day2Workout | Day3Workout | Day4Workout;
}


export type ArmstrongWorkout = Day1Workout | Day2Workout | Day3Workout | Day4Workout | Day5Workout;

export interface WorkoutLoadData {
  currentDay: ArmstrongDay;
  workoutData: ArmstrongWorkout;
  canStart: boolean;
}
