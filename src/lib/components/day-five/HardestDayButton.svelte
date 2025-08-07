<script lang="ts">
	import type { ArmstrongDayNumber } from '$lib/types';

	interface Props {
		dayNumber: ArmstrongDayNumber;
		dayName: string;
		selectedDay?: ArmstrongDayNumber;
	}

	let { dayName, dayNumber, selectedDay = $bindable() }: Props = $props();

	function handleDaySelection() {
		selectedDay = dayNumber;
	}
</script>

<button
	type="button"
	class="hardest-day-selector-button"
	onclick={handleDaySelection}
>
	Day {dayNumber}: {dayName}
</button>

<style>
	.hardest-day-selector-button {
		width: 100%;
		height: 3.75rem;
		border-radius: 0.5rem;
	}
</style>
