<script lang="ts">
	import { MaxoutSetRepList } from '$lib/components';

	interface Props {
		missedSetReps: number[];
		completeSet: (repsToDo: number) => void;
	}

	let { missedSetReps, completeSet }: Props = $props();
</script>

<h3 class="missed-rep-heading">Max out!</h3>
<MaxoutSetRepList {missedSetReps} {completeSet} />

<style>
	.missed-rep-heading {
		text-align: center;
	}
</style>
