import { browser } from '$app/env';
import { connect, JSONCodec, type ConnectionOptions, type NatsConnection, type Msg } from 'nats.ws';
import { readable, type Readable } from 'svelte/store';

export interface NatsStore {
	subscribe: <T>(subject: string) => Readable<T | undefined>;
	publish: (subject: string, data?: object) => void;
}

const jc = JSONCodec();

export async function nats(opts?: ConnectionOptions): Promise<NatsStore | undefined> {
	// Can't use WebSocket server side
	if (!browser) {
		return;
	}

	let nc = await connect(opts);

	return {
		subscribe: <T>(subject: string): Readable<T | undefined> => {
			return readable<T | undefined>(undefined, (set) => {
				let sub = nc.subscribe(subject, {
					// TODO: Deal with errors?
					callback: (_, msg) => {
						set(jc.decode(msg.data) as T);
					}
				});

				return () => {
					if (sub) {
						sub.drain();
					}
				};
			});
		},
		publish: (subject: string, data?: object) => {
			console.log(data);
			nc.publish(subject, jc.encode(data));
		}
	};
}
