<script lang="ts">
  import { pushState } from "$app/navigation";
	import {DAY_2_WORKOUT_STATE, type WorkoutState} from "$lib";
  import {MaxoutSetRepList, MissedSetRepList, SaveWorkoutButton} from "$lib/components";

  interface Props {
    showTimer: boolean;
    sets: number[];
  }

  let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

  let repsToDo = $derived(sets.length + 1);
  let ascendingMessage = $derived(`Do ${repsToDo} rep${repsToDo === 1 ?'' : 's'}`);

  function createMissedSetReps(set: number[]): number[] {
    return [0].concat(set);
  }

  let missedSetReps: number[] = $state([]);

  const MESSAGES = {
    ASCENDING: 'ascending',
    MISSED_SET: 'How many did you do?',
    MAX_OUT: 'Maxout!',
    COMPLETE: 'Save your progress!',
  }


  function completeSet(reps: number) {
    if (workoutState === DAY_2_WORKOUT_STATE.MAX_OUT) {
      sets.push(reps);
      workoutState = DAY_2_WORKOUT_STATE.COMPLETE;
    } else if (workoutState === DAY_2_WORKOUT_STATE.MISSED_SET) {
      workoutState = DAY_2_WORKOUT_STATE.MAX_OUT;
      sets.push(reps);
      showTimer = true;
      pushState('', {
        showTimer: true
      });
    } else {
      sets.push(reps);
      showTimer = true;
      pushState('', {
        showTimer: true
      });
    }
  };

  let workoutState = $state<WorkoutState>(DAY_2_WORKOUT_STATE.ASCENDING);

  function missedSet() {
    workoutState = DAY_2_WORKOUT_STATE.MISSED_SET satisfies WorkoutState;
    missedSetReps = createMissedSetReps(sets);
  }

  let missedRep = $state(0);
  let maxoutRep = $state(0);

</script>

<!-- Will need to add section for putting in missed set number of reps -->
<!-- Will need another section for putting in max out number of reps -->

<div class="set-info">
  {#if workoutState === DAY_2_WORKOUT_STATE.ASCENDING}
    <h3>{ascendingMessage}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.MISSED_SET}
    <h3>{MESSAGES.MISSED_SET}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
    <h3>{MESSAGES.MAX_OUT}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
    <h3>{MESSAGES.COMPLETE}</h3>
  {/if}
</div>

<div class="set-controls">
  {#if workoutState === DAY_2_WORKOUT_STATE.ASCENDING}
  <button
    type="button"
    class="button-missed-set button-set-control"
    onclick={missedSet}
  >
    Missed Set
  </button>

  <button
    type="button"
    class="button-complete-set button-set-control"
    onclick={() => completeSet(repsToDo)}
  >
    Complete Set
  </button>
  {:else if workoutState === DAY_2_WORKOUT_STATE.MISSED_SET}
    <MissedSetRepList {missedSetReps} {completeSet} />
  {:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
    <MaxoutSetRepList {missedSetReps} {completeSet} />
  {:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
    <SaveWorkoutButton />
  {/if}
</div>

<style>

  .set-controls {
    display: flex;
    gap: 1rem;
  }

  .set-info {
    display: flex;
    justify-content: center;
    height: 3.75rem;
  }

  .button-missed-set {
    width: 100%;
    background-color: darkseagreen;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .button-complete-set {
    width: 100%;
    background-color: #16a34a;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .button-complete-set:hover {
    background-color: #15803d;
  }
</style>

