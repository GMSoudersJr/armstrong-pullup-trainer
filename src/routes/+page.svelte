<!-- +page.svelte (Day Selector / Home) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeIDB } from '$lib/indexedDB';
	import { Header, Overview, RecommendedWorkout } from '$lib/components';
	// Mock data for demonstration
	import type { PageProps } from './$types';
	import type { TDayComplete } from '$lib/indexedDB/definitions';
	import { getOverallProgess } from '$lib/indexedDB/actions';

	let { data }: PageProps = $props();

	let progress: TDayComplete[] = $state([]);

	onMount(async () => {
		if (typeof window !== undefined && 'indexedDB' in window) {
			initializeIDB();
			progress = await getOverallProgess();
		}
	});
</script>

<div class="page">
	<!-- Header -->
	<Header
		progress={`Progress: ${data.mockData.completedWorkouts}/${data.mockData.totalWorkouts} workouts completed `}
	/>
	{progress.length}
	<!-- Today's Recommended Workout -->
	<RecommendedWorkout
		subtitle={`Week ${data.mockData.currentWeek}, Day ${data.mockData.currentDay}`}
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
