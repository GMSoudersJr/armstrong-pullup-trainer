<script lang="ts">
	import { HardestDaySelector } from '$lib/components';
	import type { TDayComplete } from '$lib/indexedDB/definitions';

	interface Props {
		selectedWorkout?: TDayComplete;
	}

	let { selectedWorkout = $bindable() }: Props = $props();
	$inspect(selectedWorkout);
</script>

{#if selectedWorkout === undefined}
	<HardestDaySelector bind:selectedWorkout />
{/if}
