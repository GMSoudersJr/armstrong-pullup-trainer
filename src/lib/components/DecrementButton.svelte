<script lang="ts">
  interface Props {
    reps: number;
  }

  function decrement() {
    reps -= 1;
  }

  let { reps = $bindable() }: Props = $props();
  let disabled = $derived(reps < 1);
</script>

<button
  type="button"
  onclick={decrement}
  class="button-rep-control"
  disabled={disabled}
>
  -
</button>

<style>
</style>

