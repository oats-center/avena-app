<script lang="ts">
	import { nats } from './nats';
	import { setContext } from 'svelte';
	import WarningIcon from '$lib/assets/icons/WarningIcon.svelte';

	let server = '';
	let token = '';
	let error: string | undefined;
	let connecting = false;

	let nc = nats();
	setContext('nats', nc);

	async function connect() {
		connecting = true;
		error = undefined;
		error = await nc.connect({ servers: `wws://${server}:443`, token });
		connecting = false;
	}
</script>

<!-- Connect to fleet server modal -->
<div class="modal modal-open" class:modal-open={$nc === undefined}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Connect to your Avena fleet</h3>
		{#if error}
			<div class="alert alert-warning shadow-lg justify-center">
				<div>
					<WarningIcon class="stroke-current flex-shrink-0 h-6 w-6" />
					<span>Warning: {error}</span>
				</div>
			</div>
		{/if}
		<div class="form-control w-full">
			<label for="server" class="label">
				<span class="label-text">Fleet server</span>
			</label>
			<input
				id="server"
				type="text"
				bind:value={server}
				class="input input-bordered input-warning w-full"
			/>

			<label for="server" class="label">
				<span class="label-text">Fleet password</span>
			</label>
			<input
				id="server"
				type="text"
				bind:value={token}
				class="input input-bordered input-warning w-full"
			/>
		</div>

		<div class="modal-action">
			<a
				href="#"
				class="btn"
				class:loading={connecting}
				class:btn-disabled={connecting}
				on:click={connect}>{connecting ? 'Connecting' : 'Connect'}</a
			>
		</div>
	</div>
</div>

<slot />
