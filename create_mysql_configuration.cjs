var fs = require("fs");
if (fs.existsSync("./.env")) {
	fs.rmSync("./.env");
}
var parsed_env = {
	host: process.argv[2].split("=")[1],
	user: process.argv[3].split("=")[1],
	port: Number(process.argv[4].split("=")[1]),
	password: process.argv[5].split("=")[1],
};
console.log(parsed_env);

var string_to_write_in_dot_env = `mysql_host="${parsed_env.host}"
mysql_user="${parsed_env.user}"
mysql_password="${parsed_env.password}"
mysql_port=${parsed_env.port}`;
fs.writeFileSync("./.env", string_to_write_in_dot_env);
