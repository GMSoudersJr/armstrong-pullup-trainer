<script lang="ts">
  let { value = $bindable(), ...props } = $props();
</script>

<input
  class="rep-input"
  type="number"
  min="0"
  bind:value
>

<style>
  .rep-input {
    text-align: center;
    flex: 1;
    border-radius: 0.5rem;
  }
</style>

