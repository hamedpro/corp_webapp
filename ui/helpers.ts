import axios from "axios";
export function deep_copy<T>(input: T): T {
	return JSON.parse(JSON.stringify(input));
}
export function roundDownToNDigits(num: number, n: number): number {
	const factor = Math.pow(10, n);
	return Math.floor(num * factor) / factor;
}
export const custom_axios = axios.create({
	baseURL: "https://pc.next-step.ir",
});
