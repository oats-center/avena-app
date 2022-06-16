<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getContext } from 'svelte';
	import type { NatsStore } from '$lib/nats/nats';
	import { activeDevice } from '$lib/devices';
	import formatDuration from 'format-duration';

	let time = Date.now();
	let secondsInterval = setInterval(() => {
		time = Date.now();
	}, 100);

	let ActiveService: Service[] = [];

	let nats = getContext<SvelteStore<NatsStore>>('nats');

	interface Service {
		name: string;
		description: string;
		load_state: string;
		active_state: string;
		sub_state: string;
		followed_by: string;
		service_type: string;
		status: string;
		start_time: number;
		exit_time: number;
		pid: number;
		memory_accounting: boolean;
		memory_current: number;
		memory_available: number;
		cpu_accounting: boolean;
		cpu_shares: number;
		cpu_usage_n_sec: number;
	}

	async function makeStatusRequest() {
		if ($nats) {
			let services = await $nats.request<Service[]>(
				`${$activeDevice.prefix}.$avena.services.status`,
				{ avenaOnly: true },
				{ timeout: 2000 }
			);

			ActiveService = services.data;
		}
	}

	// Make first request right away
	$: if ($nats) makeStatusRequest();

	// Clear the table while we wait for the new services to come back
	$: if ($activeDevice) ActiveService = [];

	const interval = setInterval(makeStatusRequest, 2000);
	onDestroy(() => {
		clearInterval(interval);
		clearInterval(secondsInterval);
	});
</script>

<main>
	<h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-2">
		Services on {$activeDevice.name}
	</h2>
	<div class="divider w-full" />

	<div class="overflow-x-auto w-full">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Service</th>
					<th>Run time</th>
					<th>Memory</th>
					<th>CPU</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each ActiveService as service}
					<tr>
						<td>
							<div class="stat break-words">
								<div class="stat-value text-primary text-lg">{service.name}</div>
								<div class="stat-title">{service.description}</div>
								<div class="stat-desc">PID: {service.pid}</div>
							</div>
						</td>
						<td>
							<div class="stat">
								<div class="stat-title">Run Time</div>
								<div class="stat-value text-xlg font-mono">
									{formatDuration(Math.floor(time) - Math.floor(service.start_time / 1000))}
								</div>
							</div>
						</td>
						<td>
							<div class="stat">
								<div class="stat-title">Memory Usage</div>
								<div class="stat-value text-xlg font-mono">
									{service.memory_current / 1024} kB
								</div>
							</div>
						</td>
						<td>
							<div class="stat">
								<div class="stat-title">CPU Usage</div>
								<div class="stat-value text-xlg font-mono">
									{(service.cpu_usage_n_sec / 1000000000).toFixed(3)}s
								</div>
							</div>
						</td>

						<th class="flex flex-col">
							<button class="btn btn-sm btn-secondary m-2">Restart</button>
							<button class="btn btn-sm btn-primary m-2">Stop</button>
						</th>
					</tr>
				{/each}
			</tbody>
			<!-- foot -->
			<tfoot>
				<tr>
					<th>Service</th>
					<th>Run time</th>
					<th>Memory</th>
					<th>CPU</th>
					<th />
				</tr>
			</tfoot>
		</table>
	</div>
</main>
