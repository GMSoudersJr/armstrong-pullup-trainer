<script lang="ts">
	interface Props {
		data: number;
	}

	let { data = 0 }: Props = $props();
</script>

<div class="big-number-container">
	<div class="big-number">{data}</div>
	<div class="label">Training Set{data === 1 ? '' : 's'} Completed</div>
</div>

<style>
	.big-number-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.big-number {
		font-size: 4rem;
		font-weight: bold;
		color: steelblue;
	}

	.label {
		font-size: 1.5rem;
		color: #666;
	}
</style>
