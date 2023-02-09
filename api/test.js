import { put_pair } from "./client.js";
var window = { vite_api_endpoint: "http://localhost:4000" };
try {
	put_pair("content_slider_content", {
		product_ids: [1, 2, 3, 4],
		wroting_ids: [5, 6, 7, 8],
		image_file_ids: ["img133"],
	});
} catch (error) {
	console.log(error);
}
