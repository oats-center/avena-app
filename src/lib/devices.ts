import { derived, writable } from 'svelte/store';

export interface Device {
	id: string;
	name: string;
	type: 'tractor' | 'fixed';
	prefix: string;
	streamId: number;
}

export interface Devices {
	[key: string]: Device;
}

// FIXME: This seems awkward
export let devices = writable<Devices>({});
// FIXME: This should not default to udoo3 here
export let activeDeviceId = writable<string>('udoo3');
export let activeDevice = derived(
	[devices, activeDeviceId],
	([$devices, $activeDeviceId], set: (a: Device) => void) => set($devices[$activeDeviceId])
);
