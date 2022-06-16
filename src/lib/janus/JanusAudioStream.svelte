<script lang="ts">
	import type { JanusJS } from '$lib/janus/janus.js';

	import Janus from '$lib/janus/janus.js';
	import { getContext, onMount } from 'svelte';

	export let streamId: number;
	export let stream: boolean;
	export let volume = 1;

	let streaming: JanusJS.PluginHandle;

	$: if (audio) audio.volume = volume;

	$: if (streaming) {
		if (stream) {
			console.log('starting');
			streaming.send({ message: { request: 'start' } });
			audio.play();
		} else {
			streaming.send({ message: { request: 'pause' } });
		}
	}

	let audio: HTMLAudioElement;

	let janus2 = getContext<Promise<JanusJS.Janus>>('janus');

	onMount(async () => {
		let janus = await janus2;

		janus.attach({
			plugin: 'janus.plugin.streaming',
			error: console.error,
			onmessage: (_, jsep) => {
				if (jsep) {
					streaming.createAnswer({
						jsep,
						media: { audioSend: false, videoSend: false, data: true },
						error: console.error,
						success: (answer: JanusJS.JSEP) => {
							jsep = answer;

							// TODO: DOES THIS GO HERE? CAN I SEND THE JSEP BACK WITHOUT HAVING TO CALL START RIGHT AWAY?
							streaming.send({ message: { request: 'start' }, jsep });
						}
					});
				}
			},
			onremotetrack: (track: MediaStreamTrack, mid: string, on: boolean) => {
				if (on && track.kind === 'audio') {
					let stream = new MediaStream();
					stream.addTrack(track.clone());

					Janus.attachMediaStream(audio, stream);
					// audio.play();
					audio.volume = 1;
				}
			},

			success: (plugin) => {
				streaming = plugin;
				plugin.send({ message: { request: 'watch', id: streamId } });
			}
		});
	});
</script>

<audio bind:this={audio} playsinline class="invisible" />
