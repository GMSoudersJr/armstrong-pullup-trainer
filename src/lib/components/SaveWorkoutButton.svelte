<script lang="ts">
	import { getWorkoutContext } from '$lib/workoutContext';

	interface Props {}

	let {}: Props = $props();

	const workoutContext = getWorkoutContext();
	/*
	 Save the current workout to IndexedDB
	*/
	function saveWorkout() {
		console.log(workoutContext);
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
