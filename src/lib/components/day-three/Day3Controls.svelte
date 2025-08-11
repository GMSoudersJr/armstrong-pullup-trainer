<script lang="ts">
	import { pushState } from '$app/navigation';
	import { DAY_3_WORKOUT_STATE } from '$lib/workoutStates';
	import {
		GripSelector,
		ReppingOut,
		TrainingSetInput,
		MissedSetSection,
		WorkoutComplete
	} from '$lib/components';
	import { ThreeSetsThreeGrips } from '$lib/workoutClasses.svelte';

	interface Props {
		showTimer: boolean;
		sets: number[];
		workout: ThreeSetsThreeGrips;
	}

	let reps = $state<number>(0);

	let {
		showTimer = $bindable(),
		sets = $bindable(),
		workout
	}: Props = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (sets.length === 9) {
			workout.updateState(DAY_3_WORKOUT_STATE.COMPLETE);
			return;
		}
		if (sets.length % 3 === 0) {
			workout.updateState(DAY_3_WORKOUT_STATE.GRIP_SELECTION);
		} else {
			workout.updateState(DAY_3_WORKOUT_STATE.REPPING_OUT);
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	function missedSet() {
		workout.updateState(DAY_3_WORKOUT_STATE.MISSED_SET);
	}

	let reppingOutMessage = $derived<string>(
		`Do ${workout.trainingSet} ${workout.selectedGrips.at(-1)} grip reps`
	);

	$inspect(workout.state);
</script>

{#if workout.state === DAY_3_WORKOUT_STATE.TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps {workout} />
{:else if workout.state === DAY_3_WORKOUT_STATE.GRIP_SELECTION}
	<GripSelector {workout} />
{:else if workout.state === DAY_3_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workout.state === DAY_3_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {completeSet} {workout} />
{:else if workout.state === DAY_3_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete {workout} />
{/if}
