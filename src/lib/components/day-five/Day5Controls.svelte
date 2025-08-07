<script lang="ts">
	import { HardestDaySelector } from '$lib/components';
	import type { ArmstrongDayNumber } from '$lib/types';

	interface Props {
		selectedDay?: ArmstrongDayNumber;
	}

	let { selectedDay = $bindable() }: Props = $props();
</script>

{#if selectedDay === undefined}
	<HardestDaySelector bind:selectedDay />
{/if}
