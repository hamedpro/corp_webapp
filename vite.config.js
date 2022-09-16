import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//console.log(process.env);
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		API_ENDPOINT: JSON.stringify(process.env.api_endpoint),
	},
});
