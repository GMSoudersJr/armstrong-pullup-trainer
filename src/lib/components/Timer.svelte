<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		recoveryTime?: number;
		showTimer: boolean;
	}

	let { recoveryTime = 0, showTimer = $bindable() }: Props = $props();

	let timeRemaining = $state(recoveryTime);
	let intervalId: NodeJS.Timeout | undefined = undefined;

	onMount(() => {
		intervalId = setInterval(() => {
			timeRemaining--;

			if (timeRemaining <= 0) {
				clearInterval(intervalId);
				showTimer = false;
			}
		}, 1000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div class="timer">
	<span class="time-display">{timeRemaining}</span>
</div>

<style>
	.timer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Courier New', monospace;
	}

	.time-display {
		font-size: 2.5rem;
		font-weight: bold;
		color: #333;
		text-align: center;
	}
</style>
