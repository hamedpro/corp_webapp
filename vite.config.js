import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs"
var {api_endpoint,frontend_port} = JSON.parse(fs.readFileSync('env.json','utf8'))
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		API_ENDPOINT: JSON.stringify(api_endpoint),
	}
});
