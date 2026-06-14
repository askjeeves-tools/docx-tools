export function mammothInput(arrayBuffer: ArrayBuffer) {
	if (typeof Buffer !== "undefined") {
		return { buffer: Buffer.from(arrayBuffer) };
	}
	return { arrayBuffer };
}
