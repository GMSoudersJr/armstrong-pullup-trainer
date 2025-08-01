<script lang="ts">
	import type { GripType } from '$lib';
	import {
		DAY_3_WORKOUT_STATE,
		type Day3WorkoutState
	} from '$lib/workoutStates';

	interface Props {
		grip: GripType;
		selectedGrips: GripType[];
		workoutState: Day3WorkoutState;
	}

	let {
		grip,
		selectedGrips = $bindable(),
		workoutState = $bindable()
	}: Props = $props();

	function gripSelected() {
		selectedGrips.push(grip);
		workoutState = DAY_3_WORKOUT_STATE.REPPING_OUT;
	}

	let disabled = $derived(selectedGrips.includes(grip));
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
