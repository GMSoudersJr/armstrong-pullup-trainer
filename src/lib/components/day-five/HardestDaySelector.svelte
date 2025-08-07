<script lang="ts">
	import { initialWorkoutData } from '$lib/initialWorkoutData';
	import type { ArmstrongDayNumber } from '$lib/types';
	import HardestDayButton from './HardestDayButton.svelte';

	interface Props {
		selectedDay?: ArmstrongDayNumber;
	}

	const previousWorkouts = initialWorkoutData.slice(0, -1);

	let { selectedDay = $bindable() }: Props = $props();
</script>

<div class="heading-wrapper">
	<h3 class="day-control-heading">Select your hardest day!</h3>
</div>
<ul class="hardest-day-list">
	{#each previousWorkouts as workoutDay (workoutDay.workoutData.day)}
		<li>
			<HardestDayButton
				dayNumber={workoutDay.workoutData.day}
				dayName={workoutDay.workoutData.name}
				bind:selectedDay
			/>
		</li>
	{/each}
</ul>

<style>
	.heading-wrapper {
		height: 3.75rem;
	}
	.day-control-heading {
		text-align: center;
	}

	.hardest-day-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
