<script lang="ts">
  import { type Day4WorkoutState, DAY_4_WORKOUT_STATE } from "$lib/workoutStates";
  import { pushState } from "$app/navigation";
  import {
    ReppingOut,
    SaveWorkoutButton,
    TrainingSetInput
  } from "$lib/components";
	import {createMissedSetReps} from "$lib/utils";
	import MissedSetSection from "../MissedSetSection.svelte";

  let reps = $state(0);

  let { showTimer = $bindable(), sets = $bindable() } = $props();

  function completeSet() {
    showTimer = true;
    pushState('', {
      showTimer: true
    });
  };

  let workoutState = $state<Day4WorkoutState>(DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT);
  let missedSetReps = $state<number[]>([]);

  function missedSet() {
    missedSetReps = createMissedSetReps(reps);
    workoutState = DAY_4_WORKOUT_STATE.MISSED_SET;
  }
</script>

{#if workoutState === DAY_4_WORKOUT_STATE.TRAINING_SET_INPUT}
  <TrainingSetInput bind:reps bind:workoutState />
  {:else if workoutState === DAY_4_WORKOUT_STATE.REPPING_OUT}
    <ReppingOut {missedSet} {reps} {completeSet} day={4}/>
  {:else if workoutState === DAY_4_WORKOUT_STATE.MISSED_SET}
    <MissedSetSection {missedSetReps} {completeSet} bind:workoutState />
  {:else if workoutState === DAY_4_WORKOUT_STATE.COMPLETE}
    <SaveWorkoutButton />
{/if}

<style>

</style>

