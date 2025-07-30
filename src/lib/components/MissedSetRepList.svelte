<script lang="ts">
  import { MissedSetRepButton } from '$lib/components';

interface Props {
  missedSetReps: number[];
  completeSet: (rep: number) => void;
}

  let { missedSetReps, completeSet }: Props = $props();

  function clickedMissedRepCount() {
    console.log('missed set input');
  }

</script>

<ul class="section-missed-set-reps-buttons">
  {#each missedSetReps as missedRep (missedRep)}
    <li>
      <MissedSetRepButton
        {missedRep}
        {completeSet}
        onButtonClick={clickedMissedRepCount}
      />
    </li>
  {/each}
</ul>

<style>
  .section-missed-set-reps-buttons {
    width: 100%;
    gap: 2rem;
    display: flex;
    justify-content: center;
    overflow-x: auto;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

