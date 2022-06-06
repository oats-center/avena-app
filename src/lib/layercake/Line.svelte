<script>
	import { getContext } from 'svelte';
	import { line, curveLinear } from 'd3-shape';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let stroke = 'black';
	export let curve = curveLinear;

	$: path = line().x($xGet).y($yGet).curve(curve);
</script>

<path class="stroke-current path-line" d={path($data)} {stroke} />

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1;
	}
</style>
