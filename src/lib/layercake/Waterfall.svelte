<script lang="ts">
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';
	import { interpolateInferno } from 'd3-scale-chromatic';

	const { data, width, height, xGet, zGet } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	let scale = window.devicePixelRatio || 1;

	$: {
		if ($ctx) {
			scale = window.devicePixelRatio || 1;

			let imageData = $ctx.getImageData(0, 0, $width * scale, $height * scale);
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);
			$ctx.putImageData(imageData, 0, scale);

			for (const d of $data) {
				$ctx.fillStyle = interpolateInferno($zGet(d));
				// $ctx.fillRect($xGet(d), 0, 1, 1);
				$ctx.fillRect($xGet(d), 0, 2.5, 2.5);
			}
		}
	}
</script>
