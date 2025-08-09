<script lang="ts">
	import type { ArmstongWorkoutDay } from '$lib/workoutContext';

	interface Props {
		workout: ArmstongWorkoutDay;
	}

	let { workout }: Props = $props();

	/*
	 Save the current workout to IndexedDB
	This will need to convert the current day into the data need for indexedDB
	*/
	function saveWorkout() {}

	$inspect(workout.getSets());
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
