<script context="module" lang="ts">
</script>

<script lang="ts">
	export let data: Array<Point>;
	export let fc;
	export let span;
	// export let Ft = 98700000;
	export let ft;
	export let visible = false;

	let brush;
	let range;
	// let innerWidth = 0
	// let innerHeight = 0
	let w;
	let h;
	let DynamicTicks = 8;

	let m = { x: 0, left: 0, right: 0 };

	function SelectFt(event) {
		// console.log(event)
		const { left, right } = brush.getBoundingClientRect();
		visible = true;
		m.x = event.clientX;
		m.left = left;
		m.right = right;
		// Ft = Math.round((m.x - left)/(right - left + 35) * (span2 * 2) + fc2 - span2);
		ft = Math.round(((m.x - left - 42) / (right - left - 42 - 10)) * span + fc - span / 2);
		console.log(ft);
	}

	$: {
		if (w <= 300) {
			DynamicTicks = 2;
		} else if (w <= 600) {
			DynamicTicks = 4;
		} else if (w > 600) {
			DynamicTicks = 8;
		}
		console.log('Ticks:' + DynamicTicks);
	}
</script>

	<!-- <div class="w-full h-full">
		
	</div> -->
</div>

<style>
	.tooltip {
		position: absolute;
		font-size: 13px;
		pointer-events: none;
		border: 1px solid #ccc;
		background: rgba(255, 255, 255, 0.85);
		transform: translate(-50%, -100%);
		padding: 5px;
		z-index: 15;
		pointer-events: none;
	}
	.line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		border-left: 2px dotted rgb(0, 0, 0);
		pointer-events: none;
	}
	.tooltip,
	.line {
		transition: left 250ms ease-out, top 250ms ease-out;
	}
	.title {
		font-weight: bold;
	}
</style>
