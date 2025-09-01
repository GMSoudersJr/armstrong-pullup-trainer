<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		chartSnippet: Snippet<
			[{ currentData: ChartData; previousData: ChartData }]
		>;
		data: ChartData;
		previousData: ChartData;
	}

	let { chartSnippet, data, previousData }: Props = $props();
</script>

<div>
	{@render chartSnippet({
		currentData: data,
		previousData: previousData
	})}
</div>
