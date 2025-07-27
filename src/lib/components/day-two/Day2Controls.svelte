<script lang="ts">
  let repsArray: number[] = $state([]);
  let repsToDo = $derived(repsArray.length + 1);
  let ascendingMessage = $derived(`Do ${repsToDo} rep${repsToDo === 1 ?'' : 's'}`);
  const missedSetMessage = 'How many did you do?';
  const maxoutMessage = 'Maxout!';

  function completedSet() {
    repsArray.push(repsToDo);
  }
</script>

<div class="set-info">
  <!-- Will need to add section for putting in missed set number of reps -->
  <!-- Will need another section for putting in max out number of reps -->
  <h3>{ascendingMessage}</h3>
</div>
<div class="set-controls">
  <button
    type="button"
    class="button-missed-set button-set-control"
  >
    Missed Set
  </button>
  <button
    type="button"
    class="button-complete-set button-set-control"
    onclick={completedSet}
  >
    Complete Set
  </button>
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

