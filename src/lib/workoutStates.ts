export type Day1WorkoutState = 'repping_out' | 'complete';
export type Day2WorkoutState = 'ascending' | 'missed' | 'max_out' | 'complete';
export type Day3WorkoutState = 'training_set_input' | 'missed_set' | 'grip_selection' | 'complete' | 'repping_out';
export type Day4WorkoutState = 'training_set_input' | 'missed_set' | 'complete' | 'repping_out';

export const DAY_1_WORKOUT_STATE = {
  REPPING_OUT: 'repping_out' as Day1WorkoutState,
  COMPLETE: 'complete' as Day1WorkoutState,
}

export const DAY_2_WORKOUT_STATE = {
  ASCENDING: 'ascending' as Day2WorkoutState,
  MISSED_SET: 'missed' as Day2WorkoutState,
  MAX_OUT: 'max_out' as Day2WorkoutState,
  COMPLETE: 'complete' as Day2WorkoutState,
}

export const DAY_3_WORKOUT_STATE = {
  TRAINING_SET_INPUT: 'training_set_input' as Day3WorkoutState,
  GRIP_SELECTION: 'grip_selection' as Day3WorkoutState,
  REPPING_OUT: 'repping_out' as Day3WorkoutState,
  MISSED_SET: 'missed_set' as Day3WorkoutState,
  COMPLETE: 'complete' as Day3WorkoutState,
}

export const DAY_4_WORKOUT_STATE = {
  TRAINING_SET_INPUT: 'training_set_input' as Day4WorkoutState,
  REPPING_OUT: 'repping_out' as Day4WorkoutState,
  MISSED_SET: 'missed_set' as Day4WorkoutState,
  COMPLETE: 'complete' as Day4WorkoutState,
}

