<script lang="ts">
  interface Props {
    missedSet: () => void;
  }

  let { missedSet }: Props = $props();
</script>

<button
  type="button"
  class="button-missed-set button-set-control"
  onclick={missedSet}
>
  Missed Set
</button>

<style>
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
</style>

