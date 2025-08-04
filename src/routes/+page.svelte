<!-- +page.svelte (Day Selector / Home) -->
<script lang="ts">
	import { Header, Overview, RecommendedWorkout } from '$lib/components';
	// Mock data for demonstration
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	$inspect(data.mockData);
</script>

<div class="page">
	<!-- Header -->
	<Header
		progress={`Progress: ${data.mockData.completedWorkouts}/${data.mockData.totalWorkouts} workouts completed `}
	/>
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
