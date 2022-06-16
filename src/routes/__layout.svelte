<script lang="ts">
	import { devices, activeDevice, activeDeviceId } from '$lib/devices';
	import { page } from '$app/stores';

	import Nats from '$lib/nats/Nats.svelte';

	import HamburgerIcon from '$lib/assets/icons/HamburgerIcon.svelte';
	import DashboardIcon from '$lib/assets/icons/DashboardIcon.svelte';
	import SpectrumIcon from '$lib/assets/icons/SpectrumIcon.svelte';
	import GithubIcon from '$lib/assets/icons/GithubIcon.svelte';
	import MapIcon from '$lib/assets/icons/MapIcon.svelte';
	import TractorIcon from '$lib/assets/icons/TractorIcon.svelte';
	import FixedIcon from '$lib/assets/icons/FixedIcon.svelte';
	import AvenaLogo from '$lib/assets/logos/AvenaLogo.svelte';
	import IoT4AgLogo from '$lib/assets/logos/IoT4AgLogo.svelte';
	import IoT4AgSmallLogo from '$lib/assets/logos/IoT4AgSmallLogo.svelte';
	import PurdueDarkLogo from '$lib/assets/logos/PurdueDarkLogo.svelte';
	import PurdueLightLogo from '$lib/assets/logos/PurdueLightLogo.svelte';
	import PurdueSmallLogo from '$lib/assets/logos/PurdueSmallLogo.svelte';

	import '../app.css';

	// Default list of devices
	$devices = {
		udoo1: {
			id: 'udoo1',
			name: 'Case 310',
			type: 'tractor',
			prefix: 'udoo1',
			streamId: 2
		},
		udoo2: {
			id: 'udoo2',
			name: 'JD 89R 370',
			type: 'tractor',
			prefix: 'udoo2',
			streamId: 3
		},
		udoo3: {
			id: 'udoo3',
			name: 'Test stand 1 @ ABE',
			type: 'fixed',
			prefix: 'udoo3',
			streamId: 4
		},
		udoo4: {
			id: 'udoo4',
			name: 'Test stand 2 @ ABE',
			type: 'fixed',
			prefix: 'udoo4',
			streamId: 5
		},
		'pi-dev10': {
			id: 'pi-dev10',
			name: 'Pi test stand tractor',
			type: 'tractor',
			prefix: 'pi-dev10'
		}
	};
</script>

<Nats>
	<div class="w-full h-full flex justify-around">
		<div class="drawer drawer-mobile max-w-screen-2xl">
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
						<!-- <h1 class="font-semibold">Spectrum Analyzer</h1> -->
					</div>

					<!-- Right navbar -->
					<div class="flex-0">
						<div class="dropdown dropdown-end">
							<label
								for="devices"
								tabindex="0"
								class="btn btn-ghost rounded-btn flex flex-col px-1"
							>
								<div class="text-sm lowercase">Viewing</div>
								<div class="text-base text-primary">{$activeDevice ? $activeDevice.name : ''}</div>
							</label>
							<div
								tabindex="0"
								id="devices"
								class="form-control dropdown-content shadow rounded-box bg-base-300 p-3"
							>
								{#each Object.values($devices) as device (device.id)}
									<label class="label cursor-pointer rounded-box hover:bg-base-100 gap-6 p-4">
										<input
											type="radio"
											bind:group={$activeDeviceId}
											value={device.id}
											name="active-device"
											class="radio"
										/>
										<div class="avatar placeholder ">
											<div
												class="w-8 h-8 rounded-full outline outline-success outline-offset-2 outline-2"
											>
												{#if device.type === 'tractor'}
													<TractorIcon
														class="w-4/5 h-4/5 stroke-neutral-content fill-neutral-content"
													/>
												{:else}
													<FixedIcon
														class="w-4/5 h-4/5 stroke-neutral-content fill-neutral-content"
													/>
												{/if}
											</div>
										</div>
										<div class="grow whitespace-nowrap flex flex-col">
											<span>{device.name}</span>
											<span class="text-xs">{device.id}</span>
										</div>
									</label>
								{/each}
							</div>
						</div>
					</div>
				</nav>

				<!-- App area -->
				<main class="flex-1">
					<slot />
				</main>

				<!-- Footer -->
				<footer class="footer p-4 flex gap-6 justify-center">
					<p class="footer-title self-center">Proudly supported by</p>

					<a href="https://foundationfar.org/" target="_blank">
						<img
							class="h-10 hidden lg:block"
							src="/FFAR.png"
							alt="Foundation for Food & Agriculture Research Logo"
						/>
						<img
							class="h-10 lg:hidden"
							src="/FFAR-small.png"
							alt="Foundation for Food & Agriculture Research Logo"
						/>
					</a>

					<!-- IoT4Ag -->
					<a href="https://iot4ag.us/" target="_blank">
						<div>
							<IoT4AgLogo class="h-10 lg:hidden" />
							<IoT4AgSmallLogo class="h-10 hidden lg:block" />
						</div>
					</a>

					<!-- Purdue -->
					<a href="https://purdue.edu" target="_blank">
						<div class="hidden lg:block">
							<PurdueDarkLogo class="h-10 hidden dark:block" />
							<PurdueLightLogo class="h-10 dark:hidden" />
						</div>
						<PurdueSmallLogo class="h-10 lg:hidden" />
					</a>
				</footer>
			</div>

			<!-- Drawer content -->
			<div class="drawer-side">
				<label for="main-drawer" class="drawer-overlay" />
				<aside class="bg-base-200 w-64 flex flex-col justify-between">
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
							<a href="/map" class="flex gap-4">
								<span class="flex-none">
									<MapIcon class="fill-current w-8 h-8" />
								</span>
								<span class="flex-1">Locate</span>
							</a>
						</li>
						<li>
							<a href="/spectrum" class="flex gap-4">
								<span class="flex-none">
									<SpectrumIcon class="fill-current w-8 h-8" />
								</span>
								<span class="flex-1">Spectrum Analyzer</span>
							</a>
						</li>
					</ul>
					<div class="flex justify-center">
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
				</aside>
			</div>
		</div>
	</div>
</Nats>
