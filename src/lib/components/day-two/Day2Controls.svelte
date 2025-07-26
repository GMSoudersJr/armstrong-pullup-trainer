<script lang="ts">

</script>

<div class="set-controls">
  <button class="delete-button button-set-control">
    Delete Set
  </button>
  <button class="complete-button button-set-control">
    Complete Set
  </button>
</div>

<style>

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

