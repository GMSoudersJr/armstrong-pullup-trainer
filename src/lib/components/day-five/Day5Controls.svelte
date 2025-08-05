<script lang="ts">
	import { HardestDaySelector } from '$lib/components';
	import type { ArmstrongDay } from '$lib/types';

	interface Props {
		selectedDay?: ArmstrongDay;
	}

	let { selectedDay = $bindable() }: Props = $props();
</script>

{#if selectedDay === undefined}
	<HardestDaySelector bind:selectedDay />
{/if}
