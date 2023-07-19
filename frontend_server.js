import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";
var { frontend_port, https_key, https_cert } = JSON.parse(fs.readFileSync("env.json", "utf8"));
var app = express();
app.use(express.static("./dist"));
app.use(cors());
app.all("/*", (req, res) => {
	res.sendFile(path.resolve("./dist/index.html"));
});
if (https_key && https_cert) {
	https.createServer({ key: https_key, cert: https_cert }, app).listen(frontend_port);
} else {
	http.createServer({}, app).listen(frontend_port);
}
