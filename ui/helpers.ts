import axios from "axios";
import JsFileDownloader from "js-file-downloader";
export function deep_copy<T>(input: T): T {
	return JSON.parse(JSON.stringify(input));
}
export function roundDownToNDigits(num: number, n: number): number {
	const factor = Math.pow(10, n);
	return Math.floor(num * factor) / factor;
}
export const custom_axios = axios.create({
	baseURL: "http://localhost:10000",
});
export function findUnique(arr: (number | string)[]): (number | string)[] {
	const uniqueSet = new Set(arr);
	return Array.from(uniqueSet);
}
export function download_a_file(file_id: number) {
	new JsFileDownloader({
		url: new URL(`/files/${file_id}`, "http://localhost:10000").href,
		headers: [],
		method: "GET",
		contentType: "application/json",
	});
}
