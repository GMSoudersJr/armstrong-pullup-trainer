<script lang="ts">
	import { DAY_4_WORKOUT_STATE } from '$lib/workoutStates';
	import { pushState } from '$app/navigation';
	import {
		ReppingOut,
		TrainingSetInput,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import MissedSetSection from '../MissedSetSection.svelte';
	import type { MaxTrainingSets } from '$lib/workoutClasses.svelte';

	interface Props {
		showTimer: boolean;
		sets: number[];
		workout: MaxTrainingSets;
	}

	let reps = $state(0);

	let {
		showTimer = $bindable(),
		sets = $bindable(),
		workout
	}: Props = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (workout.state === DAY_4_WORKOUT_STATE.MISSED_SET) {
			workout.updateState(DAY_4_WORKOUT_STATE.COMPLETE);
			return;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	let reppingOutMessage = $derived<string>(
		`Do ${reps} reps for set ${sets?.length + 1}`
	);

	function missedSet() {
		workout.updateState(DAY_4_WORKOUT_STATE.MISSED_SET);
	}
</script>

{#if workout.state === DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps {workout} />
{:else if workout.state === DAY_4_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workout.state === DAY_4_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {workout} {completeSet} />
{:else if workout.state === DAY_4_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete {workout} />
{/if}
