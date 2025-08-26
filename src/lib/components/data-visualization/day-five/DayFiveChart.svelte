<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		chartComponent: ComponentType;
		data: any;
		previousData: any;
	}

	let { chartComponent, data, previousData }: Props = $props();
</script>

<div style="position: relative;">
	<!-- Base chart for current data -->
	<svelte:component this={chartComponent} {data} />

	<!-- Overlay chart for previous data -->
	{#if previousData && previousData.length > 0}
		<div class="overlay">
			<svelte:component this={chartComponent} data={previousData} />
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
