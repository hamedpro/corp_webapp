import axios from "axios";
import JsFileDownloader from "js-file-downloader";
export function deep_copy<T>(input: T): T {
	return JSON.parse(JSON.stringify(input));
}
export function roundDownToNDigits(num: number, n: number): number {
	const factor = Math.pow(10, n);
	return Math.floor(num * factor) / factor;
}
export var server_endpoint = import.meta.env.VITE_SERVER_ENDPOINT;
export const custom_axios = axios.create({
	baseURL: server_endpoint,
});
export function findUnique<T extends string | number>(arr: T[]): T[] {
	const uniqueSet = new Set(arr);
	return Array.from(uniqueSet);
}
export function download_a_file(file_id: number) {
	new JsFileDownloader({
		url: new URL(`/files/${file_id}`, server_endpoint).href,
		headers: [],
		method: "GET",
		contentType: "application/json",
	});
}
export function areUrlsEqual(url1: string, url2: string): boolean {
	const normalizedUrl1 = url1.endsWith("/") ? url1.slice(0, -1) : url1;
	const normalizedUrl2 = url2.endsWith("/") ? url2.slice(0, -1) : url2;

	return normalizedUrl1 === normalizedUrl2;
}
