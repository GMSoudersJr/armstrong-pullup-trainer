<script lang="ts">
	import {
		addCompletedDayToWorkoutsStore,
		getCurrentWeekNumber,
		shouldStartNewWeek
	} from '$lib/indexedDB/actions';
	import {
		WorkoutToSave,
		type MaxEffortDay,
		type MaxTrainingSetsDay,
		type PyramidDay,
		type ThreeSetsThreeGripsDay
	} from '$lib/workoutClasses.svelte';
	import { onMount } from 'svelte';

	interface Props {
		workout:
			| MaxEffortDay
			| PyramidDay
			| ThreeSetsThreeGripsDay
			| MaxTrainingSetsDay;
	}

	let { workout }: Props = $props();

	onMount(async () => {
		if (typeof window !== undefined && 'indexedDB' in window) {
			let currentWeekNumber: number;
			let startNewWeek: boolean = false;
			currentWeekNumber = await getCurrentWeekNumber();
			startNewWeek = await shouldStartNewWeek();
			if (startNewWeek) currentWeekNumber++;
			workout.setWeekNumber(currentWeekNumber);
			workout.setId();
			console.log('save the workout', workout);
		}
	});

	/*
	 Save the current workout to IndexedDB
	This will need to convert the current day into the data need for indexedDB
	*/
	async function saveWorkout() {
		const workoutToSave: WorkoutToSave = new WorkoutToSave(workout);
		console.log(workoutToSave.sets);
		console.log('save the workout', workoutToSave);

		const success = await addCompletedDayToWorkoutsStore(workoutToSave);
		console.log('saved', success);
	}
</script>

<button type="button" class="button-save-workout" onclick={saveWorkout}>
	Save Workout
</button>

<style>
	.button-save-workout {
		width: 100%;
		height: 3.75rem;
		border-radius: 0.5rem;
	}
</style>
