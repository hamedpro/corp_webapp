import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";

dotenv.config();
var app = express();
app.use(express.static("./dist"));
app.use(cors());
app.all("/*", (req, res) => {
	res.sendFile(path.resolve("./dist/index.html"));
});
app.listen(Number(process.env.frontend_port), () => {
	console.log(`frontend server started on port ${process.env.frontend_port}`);
});
