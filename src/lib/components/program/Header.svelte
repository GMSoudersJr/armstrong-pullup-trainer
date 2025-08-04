<script lang="ts">
	interface Props {
		progress: string;
	}

	let { progress }: Props = $props();
</script>

<div class="header">
	<h1 class="title">Armstrong Pull-up Program</h1>
	<div class="subtitle">{progress}</div>
</div>

<style>
	.header {
		margin-bottom: 24px;
	}

	.title {
		font-size: 24px;
		font-weight: 700;
		color: #111827;
		margin: 0 0 8px 0;
	}

	.subtitle {
		font-size: 14px;
		color: #6b7280;
	}
</style>
