<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	interface Props {
		data: { group: string; values: { name: string; value: number }[] }[];
	}

	let { data = [] }: Props = $props();

	let svgElement: SVGSVGElement;

	onMount(() => {
		const svg = d3.select(svgElement);
		const width = 300;
		const height = 250;
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };

		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const x0 = d3
			.scaleBand()
			.rangeRound([margin.left, width - margin.right])
			.paddingInner(0.1);

		const x1 = d3.scaleBand().padding(0.05);

		const y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

		const color = d3.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888']);

		const xAxis = (g: any) =>
			g
				.attr('transform', `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x0));

		const yAxis = (g: any) =>
			g
				.attr('transform', `translate(${margin.left},0)`)
				.call(d3.axisLeft(y).ticks(null, 's'));

		const gx = svg.append('g').call(xAxis);
		const gy = svg.append('g').call(yAxis);

		const groups = svg.append('g');

		function update(
			data: { group: string; values: { name: string; value: number }[] }[]
		) {
			const keys = data.length > 0 ? data[0].values.map((d) => d.name) : [];
			x0.domain(data.map((d) => d.group));
			x1.domain(keys).rangeRound([0, x0.bandwidth()]);
			y.domain([
				0,
				d3.max(data, (d) => d3.max(d.values, (v) => v.value)) || 10
			]).nice();

			gx.call(xAxis);
			gy.call(yAxis);

			const group = groups
				.selectAll('g')
				.data(data)
				.join('g')
				.attr('transform', (d) => `translate(${x0(d.group)},0)`);

			group
				.selectAll('rect')
				.data((d) => d.values)
				.join('rect')
				.attr('x', (d) => x1(d.name)!)
				.attr('y', (d) => y(d.value))
				.attr('width', x1.bandwidth())
				.attr('height', (d) => y(0) - y(d.value))
				.attr('fill', (d) => color(d.name) as string);
		}

		$effect(() => {
			update(data);
		});
	});
</script>

<svg bind:this={svgElement}></svg>
