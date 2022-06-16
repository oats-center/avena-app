<script lang="ts">
	import type { NatsStore } from '$lib/nats/nats';
	import { format } from 'd3-format';
	import { debounce } from '$lib/utilities';
	import { activeDevice } from '$lib/devices';
	import { getContext } from 'svelte';

	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	import Waterfall from '$lib/layercake/Waterfall.svelte';
	import Line from '$lib/layercake/Line.svelte';
	import ConnectingIcon from '$lib/assets/icons/ConnectingIcon.svelte';
	import Area from '$lib/layercake/Area.svelte';
	import Janus from '$lib/janus/Janus.svelte';
	import JanusAudioStream from '$lib/janus/JanusAudioStream.svelte';

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

	let nats = getContext<SvelteStore<NatsStore>>('nats');

	let bins: Array<Point>;
	let fc: number;
	let gain: number;
	let span: number;
	let volume = 0.5;
	let stream = false;
	let ffts_per_second: number;

	let updateSent: number | false = false;
	let dirty = false;

	$: fft = $nats?.subscribe<FFTMsg>(`${$activeDevice.prefix}.sdr.fft`);
	$: if ($fft) {
		bins = decodeFFTBins($fft.data);
		updateControls($fft.data);
	}

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
			// stream = fft.stream;
		}

		ffts_per_second = fft.span / fft.fft_size / 256;
	}

	// Decode base64 FFT data and scale into units for display
	function decodeFFTBins(fft: FFTMsg) {
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

		$nats?.publish(`${$activeDevice.prefix}.sdr.control`, {
			ft: fc * 1000000,
			fc: fc * 1000000,
			gain,
			stream: true
		});
	}
</script>

<div class="w-full h-full flex flex-col sm:flex-row-reverse">
	<!-- Loading screen -->
	{#if !$fft}
		<div class="flex flex-col justify-center items-center w-full h-full">
			<ConnectingIcon class="fill-primary animate-bounce w-[10rem]" />
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
						on:change={debounce(50, update)}
						on:input={() => (dirty = true)}
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
					on:input={() => (dirty = true)}
					type="range"
					min="0"
					max="50"
					class="range range-sm"
					step="1"
				/>

				<!-- Tune-in -->
				<Janus server="ws://128.46.36.123:8188">
					<!-- Gain -->
					<label for="Volume" class="label font-bold">
						<span class="label-text">Volume:</span>
					</label>
					<div class="flex">
						<label class="swap">
							<!-- this hidden checkbox controls the state -->
							<input type="checkbox" bind:checked={stream} on:input={debounce(50, update)} />

							<!-- volume on icon -->
							<svg
								class="swap-on fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path
									d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
								/></svg
							>

							<!-- volume off icon -->
							<svg
								class="swap-off fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path
									d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
								/></svg
							>
						</label>
						<input
							id="volume"
							class="range range-sm w-full self-center ml-2"
							bind:value={volume}
							type="range"
							min="0"
							max="1"
							step="0.01"
						/>
					</div>
					<JanusAudioStream streamId={$activeDevice.streamId} {stream} {volume} />
				</Janus>
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
					yDomain={[-70, -20]}
					padding={{ left: 42, right: 10, bottom: 20 }}
				>
					<Svg>
						<AxisX formatTick={(d) => `${format('~s')(d)}Hz`} numTicks={(width) => width / 150} />
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
									return `${format('.0f')(v)}s`;
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
