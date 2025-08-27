<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChartData } from './types';

	interface Props {
		chartSnippet: Snippet<[ChartData]>;
		data: ChartData;
		previousData: ChartData;
	}

	let { chartSnippet, data, previousData }: Props = $props();
	$inspect(previousData);
	console.log('hello');
</script>

<div style="position: relative;">
	<!-- Base chart for current data -->
	{@render chartSnippet(data)}

	<!-- Overlay chart for previous data -->
	{#if previousData && previousData.length > 0}
		<div class="overlay">
			{@render chartSnippet(previousData)}
		</div>
	{/if}
</div>

<style>
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		pointer-events: none;
	}
</style>
