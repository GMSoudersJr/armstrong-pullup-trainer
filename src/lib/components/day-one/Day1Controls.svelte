<script lang="ts">
	import { pushState } from '$app/navigation';
	import { RepInputSection, WorkoutComplete } from '$lib/components';
	import { type Day1WorkoutState, DAY_1_WORKOUT_STATE } from '$lib/workoutStates';

	interface Props {
		sets: number[];
		showTimer: boolean;
	}

	const MAX_SETS = 5;

	let reps = $state<number>(0);
	let { showTimer = $bindable(), sets = $bindable() }: Props = $props();
	let workoutState = $state<Day1WorkoutState>(DAY_1_WORKOUT_STATE.REPPING_OUT);

	function completeSet() {
		sets.push(reps);
		if (sets.length === MAX_SETS) {
			workoutState = DAY_1_WORKOUT_STATE.COMPLETE;
			return;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	function deleteSet() {
		sets.pop();
	}
</script>

{#if workoutState === DAY_1_WORKOUT_STATE.REPPING_OUT}
	<RepInputSection bind:reps />

	<div class="set-controls">
		<button
			class="delete-button button-set-control"
			type="button"
			onclick={deleteSet}
			disabled={showTimer}
		>
			Delete Set
		</button>

		<button
			class="complete-button button-set-control"
			type="button"
			onclick={completeSet}
			disabled={showTimer}
		>
			Complete Set
		</button>
	</div>
{:else if workoutState === DAY_1_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete />
{/if}

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
