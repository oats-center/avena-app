<script lang="ts">
	import { onMount } from 'svelte';
	import { connect, JSONCodec } from 'nats.ws';
	import type { NatsConnection } from 'nats.ws';
	// import { scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';

	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	// import Area from '$lib/layercake/Area.svelte';
	import Spectrogram from '$lib/layercake/Spectrogram.svelte';
	import Line from '$lib/layercake/Line.svelte';

	let nc: NatsConnection;

	// FIXME: This is how NOT to do it
	onMount(async () => {
		// to create a connection to a nats-server:
		nc = await connect({ servers: 'ws://172.16.2.1:443' });
		// const nc = await connect({ servers: 'demo.nats.io:4223' });

		// create a codec
		const jc = JSONCodec();

		// create a simple subscriber and iterate over messages
		// matching the subscription
		const sub = nc.subscribe('sdr.fft');
		for await (const m of sub) {
			const { fft, span, fc, fft_size } = jc.decode(m.data) as {
				fft: string;
				fc: number;
				span: number;
				fft_size: number;
			};

			// let tmp = [];

			let array = Uint8Array.from(window.atob(fft), (c) => c.charCodeAt(0));
			let dv = new DataView(array.buffer);

			data = [];
			for (let i = 0; i < array.length; i++) {
				data = [
					...data,
					{
						x: fc - span / 2.0 + (i * span) / fft_size,
						y: Math.log(dv.getUint16(i, true) / 10000)
					}
				];
				i++;
			}

			// data = tmp;
		}
	});

	let data: Array<{ x: number; y: number }> = [];

	// let fScale = scaleLinear();
</script>

<div class="w-full h-full flex flex-col">
	<!-- xScale={fScale} -->
	<LayerCake
		{data}
		x="x"
		y="y"
		z="y"
		yDomain={[-8, 5]}
		padding={{ left: 35, right: 10, bottom: 20 }}
	>
		<Svg>
			<AxisX formatTick={(d) => `${format('~s')(d)}Hz`} />
			<AxisY formatTick={(d) => `${d} dB`} />
			<Line />
			<!-- <Area /> -->
		</Svg>
	</LayerCake>

	<!-- xScale={fScale} -->
	<LayerCake
		{data}
		x="x"
		y="y"
		z="y"
		yDomain={[20, 0]}
		zRange={[0, 1]}
		padding={{ left: 35, right: 10, bottom: 20 }}
	>
		<Svg>
			<AxisY gridlines={false} tickMarks={true} formatTick={(d) => `${format('~s')(d)} s`} />
		</Svg>

		<Canvas>
			<Spectrogram />
		</Canvas>
	</LayerCake>
</div>
