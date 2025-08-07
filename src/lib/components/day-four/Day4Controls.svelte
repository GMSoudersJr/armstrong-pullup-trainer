<script lang="ts">
	import { type Day4WorkoutState, getStatesForDay } from '$lib/workoutStates';
	import { pushState } from '$app/navigation';
	import {
		ReppingOut,
		TrainingSetInput,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import MissedSetSection from '../MissedSetSection.svelte';

	let reps = $state(0);

	let { showTimer = $bindable(), sets = $bindable() } = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (workoutState === getStatesForDay(4).MISSED_SET) {
			workoutState = getStatesForDay(4).COMPLETE;
			return;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	let workoutState = $state<Day4WorkoutState>(
		getStatesForDay(4).TRAINING_SET_INPUT
	);
	let missedSetReps = $state<number[]>([]);
	let reppingOutMessage = $derived<string>(
		`Do ${reps} reps for set ${sets?.length + 1}`
	);

	function missedSet() {
		missedSetReps = createMissedSetReps(reps);
		workoutState = getStatesForDay(4).MISSED_SET;
	}
</script>

{#if workoutState === getStatesForDay(4).TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps bind:workoutState day={4} />
{:else if workoutState === getStatesForDay(4).REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workoutState === getStatesForDay(4).MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === getStatesForDay(4).COMPLETE}
	<WorkoutComplete />
{/if}
