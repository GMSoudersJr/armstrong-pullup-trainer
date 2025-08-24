<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		data?: number[];
	}

	let { data = [] }: Props = $props();

	let svgRef: SVGElement;

	$effect(() => {
		if (!svgRef) return;

		const svg = d3.select(svgRef);
		const width = 600;
		const height = width / 1.618;
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };

		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const x = d3
			.scalePoint()
			.range([margin.left, width - margin.right])
			.domain(data.map((_d, i) => `Set ${i + 1}`));

		const y = d3
			.scaleLinear()
			.range([height - margin.bottom, margin.top])
			.domain([0, d3.max(data) || 10])
			.nice();

		const line = d3
			.line<number>()
			.x((_d, i) => x(`Set ${i + 1}`)!)
			.y((d) => y(d));

		// X-axis
		svg
			.selectAll('g.x-axis')
			.data([null])
			.join('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x).tickSizeOuter(0));

		// Y-axis
		svg
			.selectAll('g.y-axis')
			.data([null])
			.join('g')
			.attr('class', 'y-axis')
			.attr('transform', `translate(${margin.left},0)`)
			.call(d3.axisLeft(y));

		// Line path
		svg
			.selectAll('path.line')
			.data([data])
			.join('path')
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.transition()
			.duration(300)
			.attr('d', line);
	});
</script>

<div class="chart-container">
	<h4>Day Two -- Pyramid Sets</h4>
	<svg bind:this={svgRef}></svg>
	{#if data.length === 0}
		<p class="instructions">
			Add sets to your pyramid workout to see your progress.
		</p>
	{/if}
</div>

<style>
	.chart-container {
		width: 100%;
		max-width: 400px;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	svg {
		width: 100%;
		height: auto;
	}
</style>
