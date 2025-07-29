<script lang="ts">
  import { pushState } from "$app/navigation";
	import {DAY_2_WORKOUT_STATE, type WorkoutState} from "$lib";
	import {MissedSetRepButton} from "..";

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

  function clickedMissedRepCount() {
    console.log('missed set input');
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
    <section class="section-missed-set-reps-buttons">
      {#each missedSetReps as missedRep, i (missedRep)}
        <MissedSetRepButton
          {missedRep}
          {completeSet}
          onButtonClick={clickedMissedRepCount}
        />
      {/each}
    </section>
  {:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
    <h4>Insert max out buttons</h4>
  {:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
    <h4>Insert complete day buttons</h4>
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

  .section-missed-set-reps-buttons {
    width: 100%;
    gap: 2rem;
    display: flex;
    justify-content: center;
    overflow-x: auto;
  }
</style>

