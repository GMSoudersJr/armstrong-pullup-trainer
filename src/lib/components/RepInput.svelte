<script lang="ts">
	interface Props {
		value: number;
	}

	let { value = $bindable() }: Props = $props();
</script>

<input class="rep-input" type="number" min="0" bind:value />

<style>
	.rep-input {
		text-align: center;
		flex: 1;
		border-radius: 0.5rem;
	}

	.rep-input::-webkit-outer-spin-button,
	.rep-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.rep-input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield; /* Standard property for other browsers */
	}
</style>
