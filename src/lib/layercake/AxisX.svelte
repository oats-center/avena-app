<script lang="ts">
	import { getContext } from 'svelte';
	const { width, height, xScale, yRange } = getContext('LayerCake');

	/** @type {Boolean} [gridlines=true] - Extend lines from the ticks into the chart space */
	export let gridlines: boolean = true;

	/** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
	export let tickMarks: boolean = true;

	/** @type {Boolean} [baseline=false] – Show a solid line at the bottom. */
	export let baseline: boolean = false;

	/** @type {Boolean} [snapTicks=false] - Instead of centering the text on the first and the last items, align them to the edges of the chart. */
	export let snapTicks: boolean = false;

	/** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick: (d: number) => string | number = (d) => d;

	export let numTicks: number | ((width: number) => number) | undefined = undefined;

	/** @type {Number} [xTick=0] - TK */
	export let xTick: number = 0;

	/** @type {Number} [yTick=16] - The distance from the baseline to place each tick value. */
	export let yTick: number = 25;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = !numTicks
		? $xScale.ticks()
		: typeof numTicks === 'function'
		? $xScale.ticks(numTicks($width))
		: $xScale.ticks(numTicks);

	function textAnchor(i) {
		if (snapTicks === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	}
</script>

<g class="axis x-axis" class:snapTicks>
	{#each tickVals as tick, i}
		<g class="tick tick-{i}" transform="translate({$xScale(tick)},{$yRange[0]})">
			{#if gridlines !== false}
				<line class="gridline" y1={$height * -1} y2="0" x1="0" x2="0" />
			{/if}
			{#if tickMarks === true}
				<line
					class="tick-mark"
					y1={0}
					y2={6}
					x1={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
					x2={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
				/>
			{/if}
			<text
				class="text-base sm:text-lg"
				x={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
				y={yTick}
				dx=""
				dy=""
				text-anchor={textAnchor(i)}>{formatTick(tick)}</text
			>
		</g>
	{/each}
	{#if baseline === true}
		<line class="baseline" y1={$height + 0.5} y2={$height + 0.5} x1="0" x2={$width} />
	{/if}
</g>

<style>
	.tick {
		/* font-size: 0.725em; */
		/* font-size: 12px; */
		/* font-family: Arial; */
		/* font-weight: 200; */
	}

	line,
	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
	}

	.tick .tick-mark,
	.baseline {
		stroke-dasharray: 0;
	}
	/* This looks slightly better */
	.axis.snapTicks .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapTicks .tick.tick-0 text {
		transform: translateX(-3px);
	}
</style>
