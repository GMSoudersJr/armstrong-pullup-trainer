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
	import type { ChartData } from './types';

	interface Props {
		day?: ArmstrongDayNumber;
		data?: any;
		previousData?: any;
		selectedDay?: ArmstrongDayNumber;
		workout?:
			| MaxEffortDay
			| PyramidDay
			| ThreeSetsThreeGripsDay
			| MaxTrainingSetsDay
			| RepeatYourHardestDay;
	}

	let { data, day, previousData, selectedDay, workout }: Props = $props();

	const chartData: ChartData = $derived.by(() => {
		if (selectedDay) {
			if (workout instanceof MaxEffortDay || workout instanceof PyramidDay) {
				return workout.getSets();
			} else if (
				workout instanceof ThreeSetsThreeGripsDay ||
				workout instanceof MaxTrainingSetsDay
			) {
				return workout.getChartData();
			}
		}
		return [];
	});
	$inspect(chartData);
	$inspect(selectedDay);
</script>

<section id="data-visualization-section" class="data-visualization-section">
	{#if day === 1 && workout instanceof MaxEffortDay}
		<DayOneChart currentData={workout.getSets()} />
	{:else if day === 2 && workout instanceof PyramidDay}
		<DayTwoChart data={workout.getSets()} />
	{:else if day === 3 && workout instanceof ThreeSetsThreeGripsDay}
		<DayThreeChart data={workout.getChartData()} />
	{:else if day === 4 && workout instanceof MaxTrainingSetsDay}
		<DayFourChart data={workout.getChartData()} />
	{:else if day === 5 && selectedDay}
		{#if selectedDay === 1}
			<DayFiveChart data={chartData} {previousData}>
				{#snippet chartSnippet({ currentData, previousData })}
					<DayOneChart {currentData} {previousData} />
				{/snippet}
			</DayFiveChart>
		{:else if selectedDay === 2}
			<DayFiveChart data={chartData} {previousData}>
				{#snippet chartSnippet(data)}
					<DayTwoChart {data} />
				{/snippet}
			</DayFiveChart>
		{:else if selectedDay === 3}
			<DayFiveChart data={chartData} {previousData}>
				{#snippet chartSnippet(data)}
					<DayThreeChart {data} />
				{/snippet}
			</DayFiveChart>
		{:else if selectedDay === 4}
			<DayFiveChart data={chartData} {previousData}>
				{#snippet chartSnippet(data)}
					<DayFourChart {data} />
				{/snippet}
			</DayFiveChart>
		{/if}
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
