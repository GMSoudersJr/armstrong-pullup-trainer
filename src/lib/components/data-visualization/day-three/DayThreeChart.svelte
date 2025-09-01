<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		data?: { group: string; values: { name: string; value: number }[] }[];
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

		const x0 = d3
			.scaleBand()
			.rangeRound([margin.left, width - margin.right])
			.paddingInner(0.1);

		const x1 = d3.scaleBand().padding(0.05);

		const y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

		const color = d3.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888']);

		const keys = data.length > 0 ? data[0].values.map((d) => d.name) : [];
		x0.domain(data.map((d) => d.group));
		x1.domain(keys).rangeRound([0, x0.bandwidth()]);
		y.domain([
			0,
			d3.max(data, (d) => d3.max(d.values, (v) => v.value)) || 10
		]).nice();

		// X-axis
		svg
			.selectAll('g.x-axis')
			.data([null])
			.join('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x0));

		// Groups for bars
		const group = svg
			.selectAll('g.bar-group')
			.data(data)
			.join('g')
			.attr('class', 'bar-group')
			.attr('transform', (d) => `translate(${x0(d.group) || 0},0)`);

		// Rects inside groups
		group
			.selectAll('rect')
			.data((d) => d.values)
			.join(
				(enter) =>
					enter
						.append('rect')
						.attr('x', (d) => x1(d.name) || 0)
						.attr('y', y(0))
						.attr('width', x1.bandwidth())
						.attr('height', 0)
						.attr('fill', (d) => color(d.name) as string)
						.transition()
						.duration(500)
						.attr('y', (d) => y(d.value))
						.attr('height', (d) => y(0) - y(d.value)),
				(update) =>
					update
						.transition()
						.duration(500)
						.attr('x', (d) => x1(d.name) || 0)
						.attr('y', (d) => y(d.value))
						.attr('width', x1.bandwidth())
						.attr('height', (d) => y(0) - y(d.value)),
				(exit) =>
					exit
						.transition()
						.duration(500)
						.attr('y', y(0))
						.attr('height', 0)
						.remove()
			);

		// Text labels inside groups
		group
			.selectAll('text.label')
			.data((d) => d.values)
			.join(
				(enter) =>
					enter
						.append('text')
						.attr('class', 'label')
						.attr('x', (d) => (x1(d.name) || 0) + x1.bandwidth() / 2)
						.attr('y', y(0))
						.attr('text-anchor', 'middle')
						.attr('fill', 'white')
						.style('font-size', '12px')
						.text((d) => d.value)
						.transition()
						.duration(500)
						.attr('y', (d) => y(d.value) + 15),
				(update) =>
					update
						.text((d) => d.value)
						.transition()
						.duration(500)
						.attr('x', (d) => (x1(d.name) || 0) + x1.bandwidth() / 2)
						.attr('y', (d) => y(d.value) + 15),
				(exit) => exit.transition().duration(500).attr('y', y(0)).remove()
			);
	});
</script>

<div class="chart-container">
	<h4>Day Three -- Training Sets</h4>
	<svg bind:this={svgRef}></svg>
	{#if data.length === 0}
		<p class="instructions">
			Complete your training sets to see your progress.
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
