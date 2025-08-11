<script lang="ts">
	import { DAY_4_WORKOUT_STATE } from '$lib/workoutStates';
	import { pushState } from '$app/navigation';
	import {
		ReppingOut,
		TrainingSetInput,
		WorkoutComplete
	} from '$lib/components';
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
		workout = $bindable()
	}: Props = $props();

	function completeSet(reps: number) {
		if (workout.state === DAY_4_WORKOUT_STATE.MISSED_SET) {
			workout.addMissedSet(reps);
			workout.updateState(DAY_4_WORKOUT_STATE.COMPLETE);
			return;
		} else if (workout.state === DAY_4_WORKOUT_STATE.REPPING_OUT) {
			workout.addTrainingSet();
			showTimer = true;
			pushState('', {
				showTimer: true
			});
		}
	}

	let reppingOutMessage = $derived<string>(
		`Do ${workout.getTrainingSet()} reps for set ${workout.sets.length + 1}`
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
