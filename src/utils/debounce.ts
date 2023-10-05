// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function debounce(cb: any, delay = 500) {
	let timeout: NodeJS.Timeout;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			cb(...args);
		}, delay);
	};
}
