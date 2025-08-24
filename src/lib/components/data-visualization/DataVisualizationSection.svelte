<script lang="ts">
	import type { ArmstrongDayNumber } from '$lib/types';
	import {
		DayOneChart,
		DayTwoChart,
		DayThreeChart,
		DayFourChart,
		DayFiveChart
	} from '$lib/components/data-visualization';
	import {
		MaxEffortDay,
		MaxTrainingSetsDay,
		PyramidDay,
		RepeatYourHardestDay,
		ThreeSetsThreeGripsDay
	} from '$lib/workoutClasses.svelte';

	interface Props {
		day?: ArmstrongDayNumber;
		data?: any;
		previousData?: any;
		workout?:
			| MaxEffortDay
			| PyramidDay
			| ThreeSetsThreeGripsDay
			| MaxTrainingSetsDay
			| RepeatYourHardestDay;
	}

	let { data, day, previousData, workout }: Props = $props();
</script>

<section id="data-visualization-section" class="data-visualization-section">
	{#if day === 1 && workout instanceof MaxEffortDay}
		<DayOneChart data={workout.getSets()} />
	{:else if day === 2 && workout instanceof PyramidDay}
		<DayTwoChart data={workout.getSets()} />
	{:else if day === 3 && workout instanceof ThreeSetsThreeGripsDay}
		<DayThreeChart data={workout.getChartData()} />
	{:else if day === 4 && workout instanceof MaxTrainingSetsDay}
		<DayFourChart data={workout.getChartData()} />
	{:else if day === 5}
		<DayFiveChart chartComponent={DayOneChart} {data} {previousData} />
	{:else}
		<h3>Data Visualization Goes Here</h3>
	{/if}
</section>

<style>
	.data-visualization-section {
		height: 100%;
		border: 1px dashed red;
		border-radius: 0.5rem;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 24px;
		text-align: center;
	}
</style>
