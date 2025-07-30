export type WorkoutState = 'ascending' | 'missed' | 'max_out' | 'complete';
export type Day3WorkoutState = 'training_set_input' | 'missed' | 'grip_selection' | 'complete' | 'repping';
export type Day4WorkoutState = 'training_set_input' | 'missed' | 'complete';

export const DAY_1_WORKOUT_STATE = {
  ASCENDING: 'ascending' as WorkoutState,
  MISSED_SET: 'missed' as WorkoutState,
  MAX_OUT: 'max_out' as WorkoutState,
  COMPLETE: 'complete' as WorkoutState,
}

export const DAY_2_WORKOUT_STATE = {
  ASCENDING: 'ascending' as WorkoutState,
  MISSED_SET: 'missed' as WorkoutState,
  MAX_OUT: 'max_out' as WorkoutState,
  COMPLETE: 'complete' as WorkoutState,
}

export const DAY_3_WORKOUT_STATE = {
  GRIP_SELECTION: 'grip_selection' as Day3WorkoutState,
  TRAINING_SET_INPUT: 'training_set_input' as Day3WorkoutState,
  MISSED_SET: 'missed' as Day3WorkoutState,
  COMPLETE: 'complete' as Day3WorkoutState,
  REPPING: 'repping' as Day3WorkoutState,
}

export const DAY_4_WORKOUT_STATE = {
  TRAINING_SET_INPUT: 'training_set_input' as Day4WorkoutState,
  MISSED_SET: 'missed' as WorkoutState,
  COMPLETE: 'complete' as WorkoutState,
}

