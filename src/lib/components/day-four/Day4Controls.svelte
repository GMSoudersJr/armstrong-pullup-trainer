<script lang="ts">
	import { type Day4WorkoutState, DAY_4_WORKOUT_STATE } from '$lib/workoutStates';
	import { pushState } from '$app/navigation';
	import { ReppingOut, TrainingSetInput, WorkoutComplete } from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import MissedSetSection from '../MissedSetSection.svelte';

	let reps = $state(0);

	let { showTimer = $bindable(), sets = $bindable() } = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (workoutState === DAY_4_WORKOUT_STATE.MISSED_SET) {
			workoutState = DAY_4_WORKOUT_STATE.COMPLETE;
			return;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	let workoutState = $state<Day4WorkoutState>(DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT);
	let missedSetReps = $state<number[]>([]);
	let reppingOutMessage = $derived<string>(`Do ${reps} reps for set ${sets?.length + 1}`);

	function missedSet() {
		missedSetReps = createMissedSetReps(reps);
		workoutState = DAY_4_WORKOUT_STATE.MISSED_SET;
	}
</script>

{#if workoutState === DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps bind:workoutState day={4} />
{:else if workoutState === DAY_4_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workoutState === DAY_4_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === DAY_4_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete />
{/if}

<style>
</style>
