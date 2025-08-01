<script lang="ts">
	import { MissedSetRepList } from '$lib/components';

	interface Props {
		missedSetReps: number[];
		completeSet: (repsToDo: number) => void;
	}

	let { missedSetReps, completeSet }: Props = $props();
</script>

<h3 class="missed-rep-heading">How many did you do?</h3>
<MissedSetRepList {missedSetReps} {completeSet} />

<style>
	.missed-rep-heading {
		text-align: center;
	}
</style>
