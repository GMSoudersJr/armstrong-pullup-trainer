<!-- +page.svelte (Day Selector / Home) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeIDB } from '$lib/indexedDB';
	import { Header, Overview, RecommendedWorkout } from '$lib/components';
	// Mock data for demonstration
	import type { PageProps } from './$types';
	import type { TDayComplete, TWeek } from '$lib/indexedDB/definitions';
	import {
		addNewWeek,
		getCurrentWeekNumber,
		getLastCompletedDay,
		getOverallProgess,
		getWeeklyProgress,
		shouldStartNewWeek
	} from '$lib/indexedDB/actions';
	import {
		getRecommendedWorkoutInstructions,
		type DayWorkout
	} from '$lib/strings/instructions';
	import { calculateCompletedWorkouts } from '$lib/utils';

	let savedSkippedWorkout = $state<boolean>(false);
	let previousWorkouts: TDayComplete[] = $state([]);
	let lastCompletedDay: number | undefined = $state();
	let startNewWeek: boolean | undefined = $state();
	let currentWeekNumber: number | undefined = $state();
	let recommendedWorkout: DayWorkout | undefined = $state();
	let weeklyProgress: TWeek[] | undefined = $state();
	let completedPreviousWorkouts: number = $state(0);
	let totalPreviousWorkouts: number = $state(0);

	onMount(async () => {
		if (typeof window !== undefined && 'indexedDB' in window) {
			initializeIDB();
			updateData();
		}
	});

	let headerText: string = $derived(
		`Completed: ${completedPreviousWorkouts}/${totalPreviousWorkouts} workouts`
	);

	// Done so the UI updates without the need for refreshing the page.
	$effect(() => {
		if (savedSkippedWorkout) {
			updateData();
			savedSkippedWorkout = false;
		}
	});

	async function updateData(): Promise<void> {
		previousWorkouts = await getOverallProgess();
		completedPreviousWorkouts = calculateCompletedWorkouts(previousWorkouts);
		totalPreviousWorkouts = previousWorkouts.length;
		lastCompletedDay = await getLastCompletedDay();
		startNewWeek = await shouldStartNewWeek();
		currentWeekNumber = await getCurrentWeekNumber();
		weeklyProgress = await getWeeklyProgress();
		if (startNewWeek) {
			currentWeekNumber++;
			addNewWeek(currentWeekNumber);
		}
		recommendedWorkout = getRecommendedWorkoutInstructions(lastCompletedDay);
	}

	$inspect('save skipped', savedSkippedWorkout);
	$inspect('Current week number', currentWeekNumber);
	$inspect('Weekly progress', weeklyProgress);
	$inspect('Recommended workout', recommendedWorkout);
	$inspect('Start new week', startNewWeek);
	$inspect('Last completed day', lastCompletedDay);
</script>

<div class="page">
	<!-- Header -->
	<Header progress={headerText} />
	<!-- Today's Recommended Workout -->
	<RecommendedWorkout
		{currentWeekNumber}
		{recommendedWorkout}
		bind:savedSkippedWorkout
	/>
	<!-- Program Overview -->
	<Overview {previousWorkouts} />
</div>

<style>
	.page {
		padding: 16px;
		background-color: #f9fafb;
		min-height: 100vh;
	}
</style>
