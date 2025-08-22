<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		chartComponent: any;
		data: any;
		previousData: any;
	}

	let { chartComponent, data, previousData }: Props = $props();

	let container: HTMLElement;

	onMount(() => {
		const instance = new chartComponent({
			target: container,
			props: {
				data: data
			}
		});

		const instance2 = new chartComponent({
			target: container,
			props: {
				data: previousData
			}
		});

		// a bit of a hack to make the second chart an overlay
		const svg2 = instance2.$$.ctx[0];
		d3.select(svg2).style('position', 'absolute').style('opacity', 0.5);
	});
</script>

<div bind:this={container} style="position: relative;"></div>
