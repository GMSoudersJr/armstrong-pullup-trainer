<script lang="ts">
	interface Props {
		reps: number;
	}

	function increment() {
		reps += 1;
	}

	let { reps = $bindable() }: Props = $props();
</script>

<button type="button" onclick={increment} class="button-rep-control"> + </button>
