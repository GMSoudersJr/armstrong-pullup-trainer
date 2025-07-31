<script lang="ts">
  import {
    DecrementButton,
    RepInput,
    IncrementButton
  } from '$lib/components';

  interface Props {
    reps: number;
  }

  let { reps = $bindable() }: Props = $props();
</script>

<section class="rep-controls">
  <DecrementButton bind:reps />
  <RepInput bind:value={reps} />
  <IncrementButton bind:reps />
</section>

<style>
  .rep-controls {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
  }

</style>

