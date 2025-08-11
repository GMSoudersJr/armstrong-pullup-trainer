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
	import { ThreeSetsThreeGrips } from '$lib/workoutClasses.svelte';

	interface Props {
		showTimer: boolean;
		sets: number[];
		workout: ThreeSetsThreeGrips;
	}

	let reps = $state<number>(0);
	const WORKOUT_STATES = getStatesForDay(3);

	let {
		showTimer = $bindable(),
		sets = $bindable(),
		workout
	}: Props = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (sets.length === 9) {
			workout.updateState(WORKOUT_STATES.COMPLETE);
			return;
		}
		if (sets.length % 3 === 0) {
			workout.updateState(WORKOUT_STATES.GRIP_SELECTION);
		} else {
			workout.updateState(WORKOUT_STATES.REPPING_OUT);
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	function missedSet() {
		workout.updateState(WORKOUT_STATES.MISSED_SET);
	}

	let reppingOutMessage = $derived<string>(
		`Do ${workout.trainingSet} ${workout.selectedGrips.at(-1)} grip reps`
	);

	$inspect(workout.state);
</script>

{#if workout.state === WORKOUT_STATES.TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps {workout} />
{:else if workout.state === WORKOUT_STATES.GRIP_SELECTION}
	<GripSelector {workout} />
{:else if workout.state === WORKOUT_STATES.REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workout.state === WORKOUT_STATES.MISSED_SET}
	<MissedSetSection {completeSet} {workout} />
{:else if workout.state === WORKOUT_STATES.COMPLETE}
	<WorkoutComplete {workout} />
{/if}
