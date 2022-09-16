var fs = require("fs");
const { exit } = require("process");
if (fs.existsSync("./.env")) {
	console.log(fs.readFileSync("./.env", "utf8"));
} else {
	console.log(
		".env file was not present and may app not work properly, so first config it according to explanations available in README.md "
	);
	exit(2);
}
