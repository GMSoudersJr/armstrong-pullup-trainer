<script lang="ts">
	import type { TDayComplete } from '$lib/indexedDB/definitions';

	interface Props {
		previousWorkout?: TDayComplete;
		selectedWorkout?: TDayComplete;
	}

	let { previousWorkout, selectedWorkout = $bindable() }: Props = $props();

	function handleDaySelection() {
		selectedWorkout = previousWorkout;
	}
</script>

<button
	type="button"
	class="hardest-day-selector-button"
	onclick={handleDaySelection}
>
	Day {previousWorkout?.dayNumber}: {previousWorkout?.dayAbbreviation}
</button>

<style>
	.hardest-day-selector-button {
		width: 100%;
		height: 3.75rem;
		border-radius: 0.5rem;
	}
</style>
