<script lang="ts">
	import {
		getCurrentWeekNumber,
		getWorkoutsbyWeekNumber
	} from '$lib/indexedDB/actions';
	import type { ArmstrongDayNumber } from '$lib/types';
	import type { TDayComplete } from '$lib/indexedDB/definitions';
	import HardestDayButton from './HardestDayButton.svelte';

	interface Props {
		selectedDay?: ArmstrongDayNumber;
	}

	let previousWorkouts = $state<TDayComplete[]>([]);

	let { selectedDay = $bindable() }: Props = $props();

	$effect(() => {
		const getPreviousWorkouts = async () => {
			const currentWeekNumber = await getCurrentWeekNumber();
			if (currentWeekNumber > 0) {
				const workouts = await getWorkoutsbyWeekNumber(currentWeekNumber);
				previousWorkouts = workouts.filter((w) => w.dayNumber < 5);
			}
		};
		getPreviousWorkouts();
	});
</script>

<div class="heading-wrapper">
	<h3 class="day-control-heading">Select your hardest day!</h3>
</div>
{#if previousWorkouts.length > 0}
	<ul class="hardest-day-list">
		{#each previousWorkouts as workoutDay (workoutDay.dayNumber)}
			<li>
				<HardestDayButton
					dayNumber={workoutDay.dayNumber}
					dayName={workoutDay.dayAbbreviation}
					bind:selectedDay
				/>
			</li>
		{/each}
	</ul>
{:else}
	<p>No previous workouts found for this week.</p>
{/if}

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
