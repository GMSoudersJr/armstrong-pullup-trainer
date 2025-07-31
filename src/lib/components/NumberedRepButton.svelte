<script lang="ts">
  interface Props {
    missedRep: number;
    completeSet: (rep: number) => void;
  }

  let { missedRep, completeSet }: Props = $props();

  function handleClick(missedRep: number) {
    completeSet(missedRep);
  }

</script>

<button
  type="button"
  class="button-missed-set-rep"
  onclick={() => handleClick(missedRep)}
>
  {missedRep}
</button>

<style>
  .button-missed-set-rep {
    min-height: 3.75rem;
    min-width: 3.75rem;
    border-radius: 0.5rem;
  }
</style>

