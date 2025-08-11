<script lang="ts">
	import { MissedSetRepList } from '$lib/components';
	import type { ThreeSetsThreeGrips } from '$lib/workoutClasses.svelte';

	interface Props {
		completeSet: (repsToDo: number) => void;
		workout: ThreeSetsThreeGrips;
	}

	let { completeSet, workout }: Props = $props();
</script>

<h3 class="missed-rep-heading">How many did you do?</h3>
<MissedSetRepList {completeSet} {workout} />

<style>
	.missed-rep-heading {
		text-align: center;
	}
</style>
