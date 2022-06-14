<script context="module" lang="ts">
	import { nats, type NatsStore } from '$lib/stores/nats';
	import { format } from 'd3-format';
	import { debounce } from '$lib/utilities.js';

	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	import Waterfall from '$lib/layercake/Waterfall.svelte';
	import Line from '$lib/layercake/Line.svelte';
	import Connecting from '$lib/assets/icons/Connecting.svelte';
	import Area from '$lib/layercake/Area.svelte';

	const UPDATE_WAIT_PERIOD_MS = 2000;

	// Format of message from FFT service
	interface FFTMsg {
		fft: string;
		fft_size: number;
		fc: number;
		ft: number;
		span: number;
		gain: number;
		stream: boolean;
	}

	interface Point {
		x: number;
		y: number;
	}

	// TODO: Should this just in the context somehow?
	/** @type {import('./__types/spectrum').Load} */
	export async function load() {
		return {
			props: {
				nc: await nats({ servers: 'ws://ibts-compute.ecn.purdue.edu:443', token: 'iot4ag' })
			}
		};
	}
</script>

<script lang="ts">
	export let nc: NatsStore | undefined;

	let bins: Array<Point>;
	let fc: number;
	let gain: number;
	let span: number;
	let updateSent: number | false = false;
	let dirty = false;
	let ffts_per_second: number;

	let fft = nc?.subscribe<FFTMsg>('udoo3.sdr.fft');
	$: bins = decodeFFTBins($fft);

	// Try to update controls
	$: if ($fft) updateControls($fft);

	// Try to update the UI controls with data from last recieved FFT.
	// However, don't change the controls if an update is in progress
	function updateControls(fft: FFTMsg) {
		// Check to see if the control protect window has expired
		if (updateSent && Date.now() - updateSent > UPDATE_WAIT_PERIOD_MS) {
			updateSent = false;
		}

		// Don't update control when dirty or pending update
		if (!dirty && !updateSent) {
			fc = fft.fc / 1000000;
			span = fft.span / 1000000;
			gain = fft.gain;
		}

		ffts_per_second = fft.span / fft.fft_size / 256;
	}

	// Decode base64 FFT data and scale into units for display
	function decodeFFTBins(fft?: FFTMsg) {
		if (!fft) {
			return [];
		}

		let array = Uint8Array.from(window.atob(fft.fft), (c) => c.charCodeAt(0));
		let dv = new DataView(array.buffer);

		let points = [];
		for (let i = 0; i < array.length; i = i + 2) {
			points.push(dv.getUint16(i, true) / 10000);
		}

		let offset = 10 * Math.log10(fft.fft_size);
		return points
			.map((v, i) => ({
				x: fft.fc - fft.span / 2.0 + (i * fft.span) / fft.fft_size,
				y: 10.0 * Math.log10(v) - offset
			}))
			.filter((pt) => Number.isFinite(pt.y));
	}

	function update() {
		updateSent = Date.now();

		nc?.publish('udoo3.sdr.control', {
			ft: fc * 1000000,
			fc: fc * 1000000,
			gain: gain,
			stream: false
		});
	}
</script>

<div class="w-full h-full flex flex-col sm:flex-row-reverse">
	<!-- Loading screen -->
	{#if !$fft}
		<div class="flex flex-col justify-center items-center w-full h-full">
			<Connecting class="fill-primary animate-bounce w-[10rem]" />
			<!-- Wait until we get at least the first FFT to show anything ... need to draw most of the page's elements -->
			<h1 class="text-4xl font-bold">Connecting...</h1>
		</div>

		<!-- Spectrogram visualization -->
	{:else}
		<div class="basis-1/4 container flex justify-center py-2 px-6 sm:pl-0">
			<div class="form-control  w-full max-w-xs">
				<!-- Span -->
				<label for="center_freq" class="label font-bold">
					<span class="label-text">Span</span>
				</label>
				<label class="input-group">
					<!-- FIXME: min/max should come from SDR service -->
					<input
						id="span"
						bind:value={span}
						type="text"
						class="input input-bordered w-full max-w-xs"
						disabled
					/>
					<span>MHz</span>
				</label>

				<!-- Center Frequency -->
				<label for="center_freq" class="label font-bold">
					<span class="label-text">Center Frequency</span>
				</label>
				<label class="input-group">
					<!-- FIXME: min/max should come from SDR service -->
					<input
						id="center_freq"
						on:input={debounce(50, update)}
						on:mousedown={() => (dirty = true)}
						on:keydown={() => (dirty = true)}
						on:mouseup={() => (dirty = false)}
						on:keyup={() => (dirty = false)}
						bind:value={fc}
						type="number"
						min="24"
						max="1766"
						class="input input-bordered w-full max-w-xs"
						step={0.01}
					/>
					<span>MHz</span>
				</label>

				<!-- Gain -->
				<label for="gain" class="label">
					<span class="label-text"><span class="font-bold">Gain:</span> {gain} dB</span>
				</label>
				<!-- FIXME: min/max should come from SDR service -->
				<input
					id="gain"
					bind:value={gain}
					on:change={debounce(50, update)}
					on:mousedown={() => (dirty = true)}
					on:keydown={() => (dirty = true)}
					on:mouseup={() => (dirty = false)}
					on:keyup={() => (dirty = false)}
					type="range"
					min="0"
					max="50"
					class="range range-sm"
					step="1"
				/>
			</div>
		</div>

		<div class="basis-3/4 h-full py-2 px-2 sm:px-6">
			<div class="w-full h-full flex flex-col">
				<!--
				bind:this={brush}
				on:click={SelectFt}
				bind:clientWidth={w}
				bind:clientHeight={h}
				-->
				<LayerCake
					data={bins}
					x="x"
					y="y"
					z="y"
					yDomain={[-70, 0]}
					padding={{ left: 42, right: 10, bottom: 20 }}
				>
					<Svg>
						<AxisX formatTick={(d) => `${format('~s')(d)}Hz`} ticks={6} />
						<AxisY formatTick={(d) => `${d} dB`} tickMarks={true} />
						<Line />
						<Area />
					</Svg>

					<!-- 		{#if false === true} -->
					<!-- 			<div style="left:{m.x - m.left}px;" class="line" /> -->
					<!-- 			<div -->
					<!-- 				class="tooltip" -->
					<!-- 				style=" -->
					<!-- width:50 px; -->
					<!-- top: 500 px; -->
					<!-- left:{m.x - m.left}px;" -->
					<!-- 			> -->
					<!-- 				<div class="title">Tune to {Math.round(ft / 10000) / 100}Mhz</div> -->
					<!-- 			</div> -->
					<!-- 		{/if} -->
				</LayerCake>

				<div class="w-full h-full mt-5">
					<LayerCake
						data={bins}
						x="x"
						y="y"
						z="y"
						yDomain={[1, 0]}
						zRange={[0, 1]}
						padding={{ left: 42, right: 10, bottom: 20 }}
					>
						<Svg>
							<AxisY
								gridlines={false}
								tickMarks={true}
								formatTick={(t, height) => {
									let v = (t * height) / ffts_per_second;
									return `${format('~s')(+v.toFixed(1))}s`;
								}}
							/>
						</Svg>

						<Canvas>
							<Waterfall />
						</Canvas>
					</LayerCake>
				</div>
			</div>
		</div>
	{/if}
</div>
