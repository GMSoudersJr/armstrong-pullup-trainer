<script lang="ts">
  import { pushState } from "$app/navigation";
	import {page} from "$app/state";

  import {
    DecrementButton,
    IncrementButton,
    RepInput
  } from "$lib/components";

  interface Props {
    sets: number[];
    showTimer: boolean;
  }

  let reps = $state(0);


  let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

  let disabled = $derived(showTimer);

  function completeSet() {
    sets.push(reps);
    showTimer = true;
    pushState('', {
      showTimer: true
    });
  };

  function deleteSet() {
    sets.pop();
  }

</script>

<div class="rep-controls">
  <DecrementButton bind:reps />
  <RepInput bind:value={reps} />
  <IncrementButton bind:reps />
</div>

<div class="set-controls">
  <button
    class="delete-button button-set-control"
    type="button"
    onclick={deleteSet}
    disabled={showTimer}
  >
    Delete Set
  </button>

  <button
    class="complete-button button-set-control"
    type="button"
    onclick={completeSet}
    disabled={showTimer}
  >
    Complete Set
  </button>
</div>

<style>
  .rep-controls {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
  }

  .set-controls {
    display: flex;
    gap: 1rem;
  }

  .delete-button {
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

  .complete-button {
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

  .complete-button:hover {
    background-color: #15803d;
  }
</style>

