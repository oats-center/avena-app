import { browser } from '$app/env';
import {
	connect,
	JSONCodec,
	type ConnectionOptions,
	type NatsConnection,
	type Msg,
	type NatsError,
	Empty,
	type RequestOptions,
	type PublishOptions
} from 'nats.ws';
import { readable, writable, type Readable } from 'svelte/store';

export interface NatsStore {
	subscribe: <T>(subject: string) => Readable<JsonMsg<T> | undefined>;
	nc: NatsConnection;
	publish: (subject: string, data?: object, opts?: PublishOptions) => void;
	request: <T>(subject: string, data?: object, opts?: RequestOptions) => Promise<JsonMsg<T>>;
}

export interface JsonMsg<T> extends Omit<Msg, 'data'> {
	data: T;
}

let jc = JSONCodec();

export function nats() {
	let { subscribe, set } = writable<NatsStore | undefined>(undefined);

	return {
		subscribe,
		connect: async (opts?: ConnectionOptions) => {
			if (browser) {
				try {
					let nc = await connect(opts);
					set(createNatsStore(nc));
				} catch (e) {
					let message = 'Unknow Error!';
					if (e instanceof Error) message = e.message;
					return message;
				}
			}
		}
	};
}

function createNatsStore(nc: NatsConnection): NatsStore {
	return {
		nc,
		subscribe: <T>(subject: string): Readable<JsonMsg<T> | undefined> => {
			return readable<JsonMsg<T> | undefined>(undefined, (set) => {
				let sub = nc.subscribe(subject, {
					// TODO: Deal with errors?
					callback: (_, msg) => {
						let m: JsonMsg<T> = { ...msg, subject: msg.subject, data: jc.decode(msg.data) as T };
						set(m);
					}
				});

				return () => {
					if (sub) {
						sub.drain();
					}
				};
			});
		},
		publish: (subject: string, data?: object, opts?: PublishOptions) => {
			nc.publish(subject, jc.encode(data), opts);
		},
		request: async <T>(subject: string, data?: object, opts?: RequestOptions) => {
			let reply = await nc.request(subject, jc.encode(data), opts);
			let m: JsonMsg<T> = { ...reply, subject: reply.subject, data: jc.decode(reply.data) as T };

			return m;
		}
	};
}
