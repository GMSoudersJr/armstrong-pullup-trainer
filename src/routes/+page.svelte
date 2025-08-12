<!-- +page.svelte (Day Selector / Home) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeIDB } from '$lib/indexedDB';
	import { Header, Overview, RecommendedWorkout } from '$lib/components';
	// Mock data for demonstration
	import type { PageProps } from './$types';
	import type { TDayComplete } from '$lib/indexedDB/definitions';
	import {
		getCurrentWeekNumber,
		getLastCompletedDay,
		getOverallProgess,
		shouldStartNewWeek
	} from '$lib/indexedDB/actions';
	import {
		getRecommendedWorkoutInstructions,
		type DayWorkout
	} from '$lib/strings/instructions';

	let { data }: PageProps = $props();

	let progress: TDayComplete[] = $state([]);
	let lastCompletedDay: number | undefined = $state();
	let startNewWeek: boolean | undefined = $state();
	let currentWeekNumber: number | undefined = $state();
	let recommendedWorkout: DayWorkout | undefined = $state();

	onMount(async () => {
		if (typeof window !== undefined && 'indexedDB' in window) {
			initializeIDB();
			progress = await getOverallProgess();
			lastCompletedDay = await getLastCompletedDay();
			startNewWeek = await shouldStartNewWeek();
			currentWeekNumber = await getCurrentWeekNumber();
			if (startNewWeek) currentWeekNumber++;
			recommendedWorkout = getRecommendedWorkoutInstructions(lastCompletedDay);
		}
	});

	$inspect('Current week number', currentWeekNumber);
	$inspect('Recommended workout', recommendedWorkout);
	$inspect('Start new week', startNewWeek);
	$inspect('Last completed day', lastCompletedDay);
</script>

<div class="page">
	<!-- Header -->
	<Header
		progress={`Progress: ${data.mockData.completedWorkouts}/${data.mockData.totalWorkouts} workouts completed `}
	/>
	<!-- Today's Recommended Workout -->
	<RecommendedWorkout
		subtitle={`Week ${currentWeekNumber}, Day ${recommendedWorkout?.day}`}
		{recommendedWorkout}
	/>
	<!-- Program Overview -->
	<Overview {data} />
</div>

<style>
	.page {
		padding: 16px;
		background-color: #f9fafb;
		min-height: 100vh;
	}
</style>
