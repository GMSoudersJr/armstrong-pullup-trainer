<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	interface Props {
		data: number[];
	}

	let { data = [] }: Props = $props();

	let svgElement: SVGSVGElement;
	let chartGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

	const margin = { top: 20, right: 20, bottom: 40, left: 30 };
	const width = 300 - margin.left - margin.right;
	const height = 250 - margin.top - margin.bottom;

	onMount(() => {
		const svg = d3.select(svgElement);

		// Create main chart group
		chartGroup = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Create axes groups
		chartGroup.append('g').attr('class', 'x-axis');
		chartGroup.append('g').attr('class', 'y-axis');

		// Create bars group
		chartGroup.append('g').attr('class', 'bars');
	});

	$effect(() => {
		if (!chartGroup || data.length === 0) return;

		// Determine max value from first set (as specified)
		const maxValue = data[0] || 0;

		// Create scales
		const xScale = d3
			.scaleBand()
			.domain(d3.range(5).map((i) => `Set ${i + 1}`))
			.range([0, width])
			.padding(0.1);

		const yScale = d3
			.scaleLinear()
			.domain([0, Math.max(maxValue, d3.max(data) || 0)])
			.nice()
			.range([height, 0]);

		// Update x-axis
		(
			chartGroup.select('.x-axis') as d3.Selection<
				SVGGElement,
				unknown,
				null,
				undefined
			>
		)
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(xScale));

		// Update y-axis with fewer ticks
		const maxDataValue = d3.max(data) || 0;
		const tickCount = Math.min(5, Math.max(maxValue, maxDataValue));
		(
			chartGroup.select('.y-axis') as d3.Selection<
				SVGGElement,
				unknown,
				null,
				undefined
			>
		).call(d3.axisLeft(yScale).ticks(tickCount));

		// Prepare data for bars (pad with 0s if less than 5 sets)
		const barData = Array.from({ length: 5 }, (_, i) => ({
			index: i,
			value: data[i] || 0,
			label: `Set ${i + 1}`,
			isRecent: i === data.length - 1 && data[i] !== undefined
		}));

		// Update bars
		const bars = chartGroup
			.select('.bars')
			.selectAll('.bar')
			.data(barData, (d: any) => d.index);

		// Enter new bars
		const barsEnter = bars
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d) => xScale(d.label)!)
			.attr('width', xScale.bandwidth())
			.attr('y', height)
			.attr('height', 0)
			.attr('fill', '#4f46e5');

		// Merge enter and update selections
		const barsUpdate = barsEnter.merge(bars as any);

		// Apply transitions
		barsUpdate
			.transition()
			.duration((d: any) => (d.isRecent ? 750 : 300))
			.ease(d3.easeCubicOut)
			.attr('y', (d) => yScale(d.value))
			.attr('height', (d) => height - yScale(d.value))
			.attr('fill', (d: any) => (d.isRecent ? '#dc2626' : '#4f46e5'));

		// Exit bars
		bars
			.exit()
			.transition()
			.duration(300)
			.attr('height', 0)
			.attr('y', height)
			.remove();
	});
</script>

<svg
	bind:this={svgElement}
	{width}
	{height}
	viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.bottom + margin.top}`}
	class="pullup-chart"
>
</svg>

<style>
	.pullup-chart {
		width: 100%;
		height: auto;
		max-width: 300px;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		background: white;
	}

	:global(.pullup-chart .x-axis text) {
		font-size: 12px;
		fill: #374151;
	}

	:global(.pullup-chart .y-axis text) {
		font-size: 12px;
		fill: #374151;
	}

	:global(.pullup-chart .domain) {
		stroke: #9ca3af;
	}

	:global(.pullup-chart .tick line) {
		stroke: #e5e7eb;
	}
</style>
