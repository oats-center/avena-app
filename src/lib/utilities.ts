export function debounce<T>(delay: number, cb: (v: T) => void) {
	let timer: ReturnType<typeof setTimeout>;

	return (v: T) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			cb(v);
		}, delay);
	};
}
