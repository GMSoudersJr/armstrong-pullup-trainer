<script lang="ts">
	import { MissedSetButton, CompleteSetButton } from '$lib/components';

	interface Props {
		missedSet: () => void;
		reps: number;
		completeSet: (repsToDo: number) => void;
		reppingOutMessage: string;
	}

	let { missedSet, reps, completeSet, reppingOutMessage }: Props = $props();
</script>

<section class="repping-out-section">
	<h3 class="repping-out-message">{reppingOutMessage}</h3>
	<div class="action-buttons">
		<MissedSetButton {missedSet} />
		<CompleteSetButton repsToDo={reps} {completeSet} />
	</div>
</section>

<style>
	.repping-out-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.repping-out-message {
		text-align: center;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}
</style>
