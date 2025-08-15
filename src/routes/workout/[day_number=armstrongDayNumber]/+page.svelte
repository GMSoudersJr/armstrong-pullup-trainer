<!-- workout/+page.svelte (Daily Workout) -->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import {
		Day1Controls,
		Day2Controls,
		Day3Controls,
		Day4Controls,
		Day5Controls,
		Timer,
		TimerModal
	} from '$lib/components';
	import type { ArmstrongDayNumber } from '$lib/types';
	import { DataVisualizationSection } from '$lib/components/data-visualization';
	import {
		createWorkoutDay,
		MaxEffortDay,
		MaxTrainingSetsDay,
		PyramidDay,
		RepeatYourHardestDay,
		ThreeSetsThreeGripsDay
	} from '$lib/workoutClasses.svelte';

	let { data }: PageProps = $props();

	async function goBack() {
		try {
			workout?.reset();
			await goto('/');
		} catch (error) {
			console.log(error);
		}
	}

	let sets: number[] = $state([]);

	let showTimer = $state(false);

	let selectedDay = $state<ArmstrongDayNumber>();

	let workout = $derived.by(() => {
		if (data.workoutData) {
			if (data?.workoutData?.day === 5 && selectedDay !== undefined) {
				const result = createWorkoutDay(selectedDay);
				result.setAsRepeatDay(true);
				return result;
			} else {
				return createWorkoutDay(data.workoutData.day);
			}
		}
	});

	let recoveryTime = $derived(workout?.getRecoveryTime());

	$inspect(workout);
	$inspect(workout?.state);
	$inspect(workout?.getSets());
</script>

<div class="workout-page">
	<!-- Header with back button -->
	<section class="workout-header">
		<div class="header-content">
			<button onclick={goBack} class="back-button" aria-label="back">
				<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
					/>
				</svg>
			</button>
			<div>
				<h1 class="workout-title">Week 1, Day {data.workoutData.day}</h1>
				<p class="workout-subtitle">{workout?.name}</p>
			</div>
		</div>
	</section>

	<!-- Workout Data Visualization -->
	<DataVisualizationSection
		data={workout?.getSets()}
		day={workout?.dayNumber === 5 && selectedDay
			? selectedDay
			: workout?.dayNumber}
	/>

	<!-- Workout controls -->
	<section class="workout-controls">
		{#if workout instanceof MaxEffortDay}
			<Day1Controls bind:showTimer bind:workout />
		{:else if workout instanceof PyramidDay}
			<Day2Controls bind:showTimer bind:sets bind:workout />
		{:else if workout instanceof ThreeSetsThreeGripsDay}
			<Day3Controls bind:showTimer bind:sets bind:workout />
		{:else if workout instanceof MaxTrainingSetsDay}
			<Day4Controls bind:showTimer bind:sets bind:workout />
		{:else if workout instanceof RepeatYourHardestDay}
			<Day5Controls bind:selectedDay />
		{/if}
	</section>
</div>

{#if page.state.showTimer}
	<TimerModal
		onClose={() => {
			history.back();
			showTimer = false;
		}}
		bind:isOpen={showTimer}
		title="Recovery Timer"
	>
		<Timer {recoveryTime} bind:showTimer />
	</TimerModal>
{/if}

<style>
	.workout-page {
		min-height: 100vh;
		background-color: #f9fafb;
		display: flex;
		flex-direction: column;
	}

	.workout-header {
		background-color: #2563eb;
		color: white;
		padding: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.header-content {
		display: flex;
		align-items: center;
	}

	.back-button {
		margin-right: 12px;
		padding: 4px;
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		border-radius: 4px;
		transition: background-color 0.2s ease;
	}

	.back-button:hover {
		background-color: #1d4ed8;
	}

	.workout-title {
		font-size: 18px;
		font-weight: 600;
		margin: 0;
	}

	.workout-subtitle {
		font-size: 14px;
		opacity: 0.9;
		margin: 0;
	}

	.workout-controls {
		display: flex;
		flex-direction: column;
		border: 1px solid green;
		padding: 1rem;
		gap: 1rem;
	}
</style>
