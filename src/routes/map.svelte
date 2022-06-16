<script lang="ts">
	import { browser } from '$app/env';
	import { getContext } from 'svelte';
	import type { NatsStore } from '$lib/nats/nats';
	import { LeafletMap, TileLayer, Marker, Popup } from 'svelte-leafletjs?client';

	import 'leaflet/dist/leaflet.css';

	interface GPS {
		lat?: number;
		lon?: number;
		alt?: number;
		track?: number;
		speed?: number;
	}

	let nats = getContext<SvelteStore<NatsStore>>('nats');

	let markers: {
		[key: string]: GPS;
	} = {};

	$: gps = $nats?.subscribe<GPS>('*.gps.TPV');
	$: if ($gps) markers[$gps.subject.split('.')[0]] = $gps.data;

	// FIXME: This was just for IoT4Ag Demo
	$: gps2 = $nats?.subscribe<{ value: number }>('j1939.data.Latitude');
	$: if ($gps2) markers['pi-dev10'] = { ...markers['pi-dev10'], lat: $gps2.data.value };
	$: gps3 = $nats?.subscribe<{ value: number }>('j1939.data.NavigationBasedVehicleSpeed');
	$: if ($gps3) markers['pi-dev10'] = { ...markers['pi-dev10'], speed: $gps3.data.value };
	$: gps4 = $nats?.subscribe<{ value: number }>('j1939.data.CompassBearing');
	$: if ($gps4) markers['pi-dev10'] = { ...markers['pi-dev10'], track: $gps4.data.value };
	$: gps5 = $nats?.subscribe<{ value: number }>('j1939.data.Longitude');
	$: if ($gps5) markers['pi-dev10'] = { ...markers['pi-dev10'], lon: $gps5.data.value };
	$: gps6 = $nats?.subscribe<{ value: number }>('j1939.data.Altitude');
	$: if ($gps6) markers['pi-dev10'] = { ...markers['pi-dev10'], alt: $gps6.data.value };

	$: gps7 = $nats?.subscribe<{ value: number }>('j1939.data.EngAverageFuelEconomy');
	$: if ($gps7) markers['pi-dev10'] = { ...markers['pi-dev10'], fuel: $gps7.data.value };
	$: gps8 = $nats?.subscribe<{ value: number }>('j1939.data.EngSpeed');
	$: if ($gps8) markers['pi-dev10'] = { ...markers['pi-dev10'], engSpeed: $gps8.data.value };
	$: gps9 = $nats?.subscribe<{ value: number }>('j1939.data.EnginesDesiredOperatingSpeed');
	$: if ($gps9) markers['pi-dev10'] = { ...markers['pi-dev10'], engSpeedDesired: $gps9.data.value };
	$: gps10 = $nats?.subscribe<{ value: number }>('j1939.data.EngPercentLoadAtCurrentSpeed');
	$: if ($gps10) markers['pi-dev10'] = { ...markers['pi-dev10'], engLoad: $gps10.data.value };

	$: gps11 = $nats?.subscribe<{ value: number }>('j1939.data.EngFuelRate');
	$: if ($gps11) markers['pi-dev10'] = { ...markers['pi-dev10'], fuelRate: $gps11.data.value };
</script>

<div class="w-full h-full">
	{#if browser}
		<LeafletMap
			options={{
				center: [40.448531, -85.967187],
				zoom: 9,
				maxZoom: 20,
				maxNativeZoom: 19,
				zoomSnap: 0
			}}
		>
			<TileLayer
				url={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`}
				options={{
					minZoom: 0,
					maxZoom: 20,
					maxNativeZoom: 19,
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}}
			/>
			{#each Object.entries(markers) as [id, marker] (id)}
				{#if marker.lat && marker.lon}
					<Marker latLng={[marker.lat, marker.lon]}>
						<Popup>
							<h1 class="text-lg font-bold">{id}</h1>
							<div>Speed: {marker.speed ? (marker.speed * 0.621371).toFixed(1) : ''} mph</div>
							<div>Heading: {marker.track ? marker.track.toFixed(1) : ''} °</div>
							<div>Altitude: {marker.alt ? (marker.alt * 3.28084).toFixed(1) : ''} ft</div>
							{#if id === 'pi-dev10'}
								<br />
								<h1 class="font-bold">Fuel</h1>
								<div>Average Fuel Economy: {marker.fuel ? marker.fuel.toFixed(1) : ''} km/L</div>
								<div>Fuel Rate: {marker.fuelRate ? marker.fuelRate.toFixed(1) : ''} L/h</div>

								<br />
								<h1 class="font-bold">Engine</h1>
								<div>
									Desired Engine Speed: {marker.engSpeedDesired
										? marker.engSpeedDesired.toFixed(1)
										: ''} rpm
								</div>
								<div>Engine Speed: {marker.engSpeed ? marker.engSpeed.toFixed(1) : ''} rpm</div>
								<div>Engine Load: {marker.engLoad ? marker.engLoad.toFixed(1) : ''} %</div>
							{/if}
						</Popup>
					</Marker>
				{/if}
			{/each}
		</LeafletMap>
	{/if}
</div>
