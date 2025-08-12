<script lang="ts">
	import type { ArmstrongDayNumber } from '$lib/types';
	import { Day1Plot } from '$lib/components/data-visualization';

	interface Props {
		day?: ArmstrongDayNumber;
		data?: number[];
	}

	let { data = [], day }: Props = $props();
</script>

<section id="data-visualization-section" class="data-visualization-section">
	<h3>Data Visualization Goes Here</h3>
	<h4>
		{#if day !== 5}
			Sets: {data}
		{/if}
	</h4>
	<Day1Plot {data} />
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
