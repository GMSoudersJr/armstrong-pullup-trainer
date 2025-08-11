<script lang="ts">
	import type { GripType } from '$lib';
	import type { ThreeSetsThreeGrips } from '$lib/workoutClasses.svelte';
	import { getStatesForDay } from '$lib/workoutStates';

	interface Props {
		grip: GripType;
		workout: ThreeSetsThreeGrips;
	}

	let { grip, workout }: Props = $props();

	function gripSelected() {
		workout.addGrip(grip);
		workout.updateState(getStatesForDay(3).REPPING_OUT);
	}

	let disabled = $derived(workout.selectedGrips.includes(grip));
</script>

<button
	type="button"
	class="button-grip-selector"
	onclick={gripSelected}
	{disabled}
>
	{grip}
</button>

<style>
	.button-grip-selector {
		width: 100%;
		height: 3.75rem;
		border-radius: 0.5rem;
	}
</style>
