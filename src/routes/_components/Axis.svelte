<script>
	import { Layer } from 'svelte-canvas';

	export let scale,
		tickSize = 4,
		margin,
		tickNumber = 4,
		type = 'x';

	$: ticks = scale.ticks(tickNumber);

	$: render = ({ context, width, height }) => {
		context.beginPath();

		ticks.forEach((d) => {
			if (type === 'x') {
				context.moveTo(scale(d), height - margin.bottom);
				context.lineTo(scale(d), height - margin.bottom + tickSize);
			} else if (type === 'y') {
				context.moveTo(margin.left, scale(d));
				context.lineTo(margin.left - tickSize, scale(d));
			}
		});

		context.strokeStyle = '#666';
		context.stroke();

		context.textAlign = type === 'x' ? 'center' : 'right';
		context.textBaseline = type === 'x' ? 'top' : 'middle';
		context.fillStyle = '#666';

		ticks.forEach((d) => {
			if (type === 'x') {
				context.fillText(d+'MHz', scale(d), height - margin.bottom + tickSize + 1);
			} else if (type === 'y') {
				context.font = "12px Arial";
				context.fillText(d+'ms', margin.left - tickSize - 1, scale(d));
			}
		});
	};
</script>

<Layer {render} />

