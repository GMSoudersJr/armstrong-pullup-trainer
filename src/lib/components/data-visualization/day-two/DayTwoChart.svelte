<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	interface Props {
		data: number[];
	}

	let { data = [] }: Props = $props();

	let svgElement: SVGSVGElement;

	onMount(() => {
		const svg = d3.select(svgElement);
		const width = 300;
		const height = 250;
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };

		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const x = d3.scalePoint().range([margin.left, width - margin.right]);

		const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

		const line = d3
			.line<number>()
			.x((_d, i) => x(`Set ${i + 1}`)!)
			.y((d) => y(d));

		const xAxis = (g: any) =>
			g
				.attr('transform', `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x).tickSizeOuter(0));

		const yAxis = (g: any) =>
			g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

		const gx = svg.append('g').call(xAxis);
		const gy = svg.append('g').call(yAxis);

		const path = svg
			.append('path')
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5);

		function update(data: number[]) {
			x.domain(data.map((_d, i) => `Set ${i + 1}`));
			y.domain([0, d3.max(data, (d) => d) || 10]).nice();

			gx.call(xAxis);
			gy.call(yAxis);

			path.datum(data).transition().duration(300).attr('d', line);
		}

		$effect(() => {
			update(data);
		});
	});
</script>

<svg bind:this={svgElement}></svg>
