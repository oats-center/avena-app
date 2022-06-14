<script lang="ts">
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale, extents } = getContext('LayerCake');

	$: path =
		'M' +
		$data
			.map((d: unknown) => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L');

	let area: string;

	$: {
		const yRange = $yScale.range();
		area =
			path +
			('L' +
				$xScale($extents.x ? $extents.x[1] : 0) +
				',' +
				yRange[0] +
				'L' +
				$xScale($extents.x ? $extents.x[0] : 0) +
				',' +
				yRange[0] +
				'Z');
	}
</script>

<path class="path-area fill-slate-500 opacity-50" d={area} />
