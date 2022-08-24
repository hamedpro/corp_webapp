var fs = require("fs");
var crypto = require("crypto");
if (fs.existsSync("./.env")) {
	fs.rmSync("./.env");
}
var parsed_env = {
	host: process.argv[2].split("=")[1],
	user: process.argv[3].split("=")[1],
	port: Number(process.argv[4].split("=")[1]),
	password: process.argv[5].split("=")[1],
};

var ACCESS_TOKEN_SECRET = crypto.randomBytes(20).toString("hex");
var PASSWORD_HASHING_SECRET = crypto.randomBytes(20).toString("hex");
var REFRESH_TOKEN_SECRET = crypto.randomBytes(20).toString("hex");

var string_to_write_in_dot_env = `
mysql_host="${parsed_env.host}"
mysql_user="${parsed_env.user}"
mysql_password="${parsed_env.password}"
mysql_port=${parsed_env.port}
ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
PASSWORD_HASHING_SECRET=${PASSWORD_HASHING_SECRET}
REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}`;

fs.writeFileSync("./.env", string_to_write_in_dot_env);
