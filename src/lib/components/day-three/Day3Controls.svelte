<script lang="ts">
	import { pushState } from '$app/navigation';
	import { getStatesForDay, type Day3WorkoutState } from '$lib/workoutStates';
	import {
		GripSelector,
		ReppingOut,
		TrainingSetInput,
		MissedSetSection,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import type { GripType } from '$lib/types';

	let reps = $state<number>(0);

	let { showTimer = $bindable(), sets = $bindable() } = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (sets.length === 9) {
			workoutState = getStatesForDay(3).COMPLETE;
			return;
		}
		if (sets.length % 3 === 0) {
			workoutState = getStatesForDay(3).GRIP_SELECTION;
		} else {
			workoutState = getStatesForDay(3).REPPING_OUT;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	let workoutState = $state<Day3WorkoutState>(
		getStatesForDay(3).TRAINING_SET_INPUT
	);
	let missedSetReps = $state<number[]>([]);

	function missedSet() {
		missedSetReps = createMissedSetReps(reps);
		workoutState = getStatesForDay(3).MISSED_SET;
	}

	let selectedGrips = $state<GripType[]>([]);
	let reppingOutMessage = $derived<string>(
		`Do ${reps} ${selectedGrips?.at(-1)} reps`
	);
</script>

{#if workoutState === getStatesForDay(3).TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps bind:workoutState day={3} />
{:else if workoutState === getStatesForDay(3).GRIP_SELECTION}
	<GripSelector {selectedGrips} bind:workoutState />
{:else if workoutState === getStatesForDay(3).REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workoutState === getStatesForDay(3).MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === getStatesForDay(3).COMPLETE}
	<WorkoutComplete />
{/if}

<style></style>
