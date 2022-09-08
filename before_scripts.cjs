require("dotenv").config();
var super_admin_access_token = process.env.SUPER_ADMIN_ACCESS_TOKEN;
console.error(
	super_admin_access_token === undefined
		? `'SUPER_ADMIN_ACCESS_TOKEN' was not defined as env variable,try following README.md to create configuration for your app`
		: `SUPER_ADMIN_ACCESS_TOKEN = "${super_admin_access_token}"`
);
