<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import adapter from 'webrtc-adapter';
	import Janus from './janus';

	export let server: string;

	setContext(
		'janus',
		new Promise<Janus>((resolve, reject) => {
			onMount(() => {
				Janus.init({
					debug: false,
					dependencies: Janus.useDefaultDependencies({
						adapter
					}),
					callback: () => {
						let janus = new Janus({
							server,
							iceServers: [
								{
									urls: 'stun:stun.l.google.com:19302'
								},
								{
									urls: 'turn:openrelay.metered.ca:80',
									username: 'openrelayproject',
									credential: 'openrelayproject'
								}
							],
							success: () => {
								resolve(janus);
							},
							error: reject
						});
					}
				});
			});
		})
	);
</script>

<slot />
