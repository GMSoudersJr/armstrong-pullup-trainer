<script lang="ts">
	interface Props {
		repsToDo: number;
		completeSet: (repsToDo: number) => void;
	}

	let { repsToDo, completeSet }: Props = $props();
</script>

<button
	type="button"
	class="button-complete-set button-set-control"
	onclick={() => completeSet(repsToDo)}
>
	Complete Set
</button>

<style>
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
