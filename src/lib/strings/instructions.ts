// armstrongProgram.ts
// Armstrong Pullup Program Data for Svelte 5 Components
// Based on Major Charles Lewis Armstrong, USMC program

export interface DayWorkout {
	day: number;
	name: string;
	description: string;
	instructions: string[];
	restPeriods: string[];
	sets: string;
	gripTypes?: string[];
	notes: string[];
	isRepeatDay?: boolean;
}

export interface ProgramInfo {
	title: string;
	creator: string;
	goal: string;
	duration: string;
	frequency: string;
	restDays: string[];
	description: string;
}

export interface MorningRoutine {
	name: string;
	exercise: string;
	sets: number;
	reps: string;
	description: string;
	instructions: string[];
}

export interface TrainingSetGuidance {
	title: string;
	description: string;
	determination: string[];
	rules: string[];
	modifications: string[];
}

// Program Overview
export const programInfo: ProgramInfo = {
	title: 'Armstrong Pull-up Program',
	creator: 'Major Charles Lewis Armstrong, USMC',
	goal: 'Achieve 20 consecutive pull-ups in 6-8 weeks',
	duration: '4+ weeks (varies by starting level)',
	frequency: '5 days per week (Monday-Friday)',
	restDays: ['Saturday', 'Sunday'],
	description:
		'This program provides VARIETY, OVERLOAD, and REGULARITY for successful physical improvement. Designed to prepare for world record pull-up attempts.'
};

// Morning Routine (done every day)
export const morningRoutine: MorningRoutine = {
	name: 'Morning Pushup Routine',
	exercise: 'Standard Pushups',
	sets: 3,
	reps: 'Maximum effort',
	description:
		'Strengthens the shoulder girdle and helps alleviate soreness during initial weeks',
	instructions: [
		'Perform immediately after waking up',
		'Do first set, then go to bathroom',
		'Return for second set, then shave',
		'Complete third set before shower',
		'Wait 3-4 hours before pull-up routine'
	]
};

// Daily Workout Routines
export const weeklyWorkouts: DayWorkout[] = [
	{
		day: 1,
		name: 'Maximum Effort Day',
		description: 'Five maximum effort sets with 90-second rest periods',
		instructions: [
			'Perform 5 maximum effort sets',
			'Rest 90 seconds between each set',
			'Do not concern yourself with numbers',
			'Focus on maximum effort for each set',
			"You'll see improvement in last two sets first"
		],
		restPeriods: ['90 seconds between all sets'],
		sets: '5 maximum effort sets',
		notes: [
			'Quality over quantity',
			'Each set must be maximum effort',
			'Progress typically shows in sets 4-5 first'
		]
	},
	{
		day: 2,
		name: 'Pyramid Day',
		description: 'Ascending pyramid until failure, then one max set',
		instructions: [
			'Start with 1 rep, then 2, then 3, etc.',
			"Continue until you miss a set (can't complete the target)",
			"Example: Complete sets of 1,2,3,4,5 but only do 4 on the '6' set",
			'After missing, do one final maximum effort set',
			'Rest 10 seconds per rep from previous set'
		],
		restPeriods: ['10 seconds per rep from previous set'],
		sets: 'Ascending pyramid + 1 max set',
		notes: [
			"Stop when you can't complete the target reps",
			'Always end with one max effort set',
			'Rest formula: if previous set was 5 reps, rest 50 seconds'
		]
	},
	{
		day: 3,
		name: 'Grip Variation Day',
		description: 'Multiple grip positions to work different muscle groups',
		instructions: [
			'3 training sets with normal overhand grip',
			'Rest 60 seconds between sets',
			'3 training sets with close underhand grip (palms toward face, pinkies touching)',
			'Rest 60 seconds between sets'
		],
		restPeriods: ['60 seconds between all sets'],
		sets: '6 training sets total',
		gripTypes: [
			'Normal overhand grip (3 sets)',
			'Close underhand grip - palms facing you, pinkies touching (3 sets)'
		],
		notes: [
			"Use your predetermined 'training set' rep count",
			'This day determines your training set numbers',
			'Must complete all 6 sets successfully'
		]
	},
	{
		day: 4,
		name: 'Maximum Training Sets',
		description: 'Perform as many training sets as possible until failure',
		instructions: [
			'Do maximum number of training sets possible',
			'Rest 60 seconds between each set',
			'Continue until you fail to complete a perfect training set',
			'Use your established training set rep count',
			'This may be your longest training day'
		],
		restPeriods: ['60 seconds between all sets'],
		sets: 'As many training sets as possible',
		notes: [
			"Stop when you can't complete a perfect set",
			'Gets easier as program progresses',
			'Helps confirm your training set rep count',
			'If you complete 9+ sets, increase training set reps next week'
		]
	},
	{
		day: 5,
		name: 'Hardest Day Repeat',
		description: 'Repeat whichever day was most challenging this week',
		instructions: [
			'Identify which day (1-4) was most difficult',
			'Repeat that entire workout',
			'This will change week to week as you improve',
			'Follow the exact protocol from that day'
		],
		restPeriods: ['Same as the repeated day'],
		sets: 'Same as the repeated day',
		isRepeatDay: true,
		notes: [
			'Changes weekly based on your progress',
			'Targets your current weakness',
			'Most people find Day 2 or Day 4 hardest initially'
		]
	}
];

// Training Set Guidance
export const trainingSetGuidance: TrainingSetGuidance = {
	title: 'Determining Your Training Set',
	description:
		'A training set is a specified number of repetitions used for Days 3 and 4',
	determination: [
		'Based on Day 3 performance - you must complete all 6 training sets',
		'If your max single set is 12 reps, training sets should be 1-2 reps',
		'Better to complete Day 3 with lower reps than fail with higher reps',
		'Day 4 confirms if training set is correct (aim for 9+ sets)'
	],
	rules: [
		'Never change training set reps mid-workout',
		'Adjust weekly based on Day 3 and Day 4 performance',
		'Quality over quantity - perfect form required',
		'If you get less than 9 sets on Day 4, training set was correct'
	],
	modifications: [
		'Women: Adapt to flexed arm hang (time-based instead of reps)',
		'Chin-ups: Can substitute, but Day 3 must include overhand grip sets',
		'Assisted pull-ups: Use minimum assistance needed to reach 6-8 reps',
		'Overhand grip recommended for military obstacle courses'
	]
};

// Program Guidelines and Important Notes
export const programGuidelines = {
	keyPrinciples: [
		'REGULARITY - Daily performance is crucial',
		'VARIETY - Different daily routines prevent plateaus',
		'OVERLOAD - Progressive challenge builds strength'
	],

	criticalRules: [
		'Rest on weekends (Saturday & Sunday)',
		'Use consecutive training days (no skipping)',
		'Pull-ups are more important than morning pushups',
		'Wait 3-4 hours between pushups and pull-ups',
		'Focus on perfect form over numbers'
	],

	expectations: [
		'May see initial performance decrease (teardown phase)',
		'Improvement typically starts in weeks 2-3',
		'Most people reach 20 reps in 4-6 weeks',
		'Starting at 12-15 reps: ~4 weeks to complete',
		'Lower starting point: longer duration needed'
	],

	maintenance: [
		'Maintain with 50+ reps daily after reaching goal',
		'Can break 50 reps into multiple sets throughout day',
		'Continue morning pushup routine for shoulder health'
	]
};

// Week-by-week progression expectations
export const progressionGuide = {
	week1: 'Adjustment period - may see slight decrease in performance',
	week2: 'Body adapts - performance begins to stabilize',
	week3: 'Noticeable improvements in endurance and recovery',
	week4: 'Significant strength gains - many reach 20 rep goal',
	week5: 'Refinement and consistency at higher rep ranges',
	week6: 'Mastery level - ready for maintenance phase'
};

export default {
	programInfo,
	morningRoutine,
	weeklyWorkouts,
	trainingSetGuidance,
	programGuidelines,
	progressionGuide
};
