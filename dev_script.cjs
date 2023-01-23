var { exec } = require('child_process')
var fs = require('fs')
var { frontend_port, api_port, api_endpoint, db_name } = JSON.parse(
	fs.readFileSync("env.json", "utf-8")
);
var script_parts = [`npx tailwindcss -c ./tailwind.config.cjs -i ./src/input.css -o ./src/output.css --watch `,`vite --host --strictPort --port ${frontend_port}`,`nodemon ./api/server.cjs`]

for (script_part of script_parts) {
    var s = exec(script_part)
    s.stdout.on('data', data => console.log(data))
    s.stderr.on('data', data => console.log(data))    
}
