<script lang="ts">
	import '../app.css';

	import HamburgerIcon from '$lib/assets/icons/HamburgerIcon.svelte';
	import DashboardIcon from '$lib/assets/icons/DashboardIcon.svelte';
	import SpectrumIcon from '$lib/assets/icons/SpectrumIcon.svelte';
	import GithubIcon from '$lib/assets/icons/GithubIcon.svelte';

	import AvenaLogo from '$lib/assets/logos/AvenaLogo.svelte';
	import IoT4AgLogo from '$lib/assets/logos/IoT4AgLogo.svelte';
	import IoT4AgSmallLogo from '$lib/assets/logos/IoT4AgSmallLogo.svelte';
	import PurdueDarkLogo from '$lib/assets/logos/PurdueDarkLogo.svelte';
	import PurdueLightLogo from '$lib/assets/logos/PurdueLightLogo.svelte';
	import PurdueSmallLogo from '$lib/assets/logos/PurdueSmallLogo.svelte';
</script>

<div class="drawer drawer-mobile">
	<input id="main-drawer" type="checkbox" class="drawer-toggle" />

	<!-- Page content -->
	<div class="drawer-content flex flex-col">
		<nav class="navbar w-full">
			<!-- Left navbar -->
			<div class="flex flex-1 gap-4">
				<label for="main-drawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
					<HamburgerIcon />
				</label>
				<div class="w-20 lg:hidden">
					<AvenaLogo />
				</div>
			</div>

			<!-- Right navbar -->
			<div class="flex-0">
				<a class="btn btn-ghost" href="https://oatscenter.org" target="_blank">
					<img
						class="inline-block h-5 md:h-6"
						src="/OATS.png"
						alt="Open Ag Technolgy and Systems Center Logo"
					/>
				</a>
				<a
					class="btn btn-ghost btn-square"
					href="https://github.com/oats-center/avena"
					target="_blank"
				>
					<GithubIcon class="inline-block h-5 w-5 fill-current md:h-6 md:w-6" />
				</a>
			</div>
		</nav>

		<!-- App area -->
		<div class="flex-1">
			<slot />
		</div>

		<!-- Footer -->
		<footer class="footer p-4 flex gap-6 justify-center">
			<p class="footer-title self-center">Proudly supported by</p>

			<a href="https://foundationfar.org/" target="_blank">
				<img
					class="h-10 hidden sm:block"
					src="/FFAR.png"
					alt="Foundation for Food & Agriculture Research Logo"
				/>
				<img
					class="h-10 sm:hidden"
					src="/FFAR-small.png"
					alt="Foundation for Food & Agriculture Research Logo"
				/>
			</a>

			<!-- IoT4Ag -->
			<a href="https://iot4ag.us/" target="_blank">
				<div>
					<IoT4AgLogo class="h-10 sm:hidden" />
					<IoT4AgSmallLogo class="h-10 hidden sm:block" />
				</div>
			</a>

			<!-- Purdue -->
			<a href="https://purdue.edu" target="_blank">
				<div class="hidden sm:block">
					<PurdueDarkLogo class="h-10 hidden dark:block" />
					<PurdueLightLogo class="h-10 dark:hidden" />
				</div>
				<PurdueSmallLogo class="h-10 sm:hidden" />
			</a>
		</footer>
	</div>

	<!-- Drawer content -->
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<aside class="bg-base-200 w-64">
			<ul class="menu menu-compact p-4 text-left">
				<div class="flex justify-center">
					<AvenaLogo class="w-32" />
				</div>
				<li />
				<li>
					<a href="/" class="flex gap-4">
						<span class="flex-none">
							<DashboardIcon class="fill-current w-8 h-8" />
						</span>
						<span class="flex-1">Dashboard</span>
					</a>
				</li>
				<li>
					<a href="/spectogram" class="flex gap-4">
						<span class="flex-none">
							<SpectrumIcon class="fill-current w-8 h-8" />
						</span>
						<span class="flex-1">Spectrogram</span>
					</a>
				</li>
			</ul>
		</aside>
	</div>
</div>

<style>
	/*
	header {
		text-align: center;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	*/
	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
        height: 20%;
        max-width: 200px;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>
