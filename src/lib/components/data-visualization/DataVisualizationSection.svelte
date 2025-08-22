<script lang="ts">
	import type { ArmstrongDayNumber } from '$lib/types';
	import {
		DayOneChart,
		DayTwoChart,
		DayThreeChart,
		DayFourChart,
		DayFiveChart
	} from '$lib/components/data-visualization';

	interface Props {
		day?: ArmstrongDayNumber;
		data?: any;
		previousData?: any;
	}

	let { data, day, previousData }: Props = $props();
</script>

<section id="data-visualization-section" class="data-visualization-section">
	{#if day === 1}
		<DayOneChart {data} />
	{:else if day === 2}
		<DayTwoChart {data} />
	{:else if day === 3}
		<DayThreeChart {data} />
	{:else if day === 4}
		<DayFourChart {data} />
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
