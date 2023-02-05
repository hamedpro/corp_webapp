import { hash_sha_256_hex } from "./common.cjs";
import express from "express";
import cors from "cors";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { cwd } from "process";
var env_vars = JSON.parse(fs.readFileSync(path.join(cwd(), "../env.json"), "utf8"));
var uploads_directory_path = path.join(cwd(), "../uploaded");
if (!fs.existsSync(uploads_directory_path)) fs.mkdirSync(uploads_directory_path);
var client = new MongoClient(env_vars.mongodb_url);
var db = client.db(env_vars.mongodb_db_name);

var app = express();
app.use(cors());
app.use(express.json());

app.get("/paired_data/:pair_key/value", async (request, response) => {
	var company_info_pair = await db
		.collection("paired_data")
		.findOne({ key: request.params.pair_key });
	if (company_info_pair === null) {
		response
			.status(404)
			.json(
				`404 - not found - there is not any document with key equal to ${request.params.pair_key}`
			);
		return;
	}
	response.json(company_info_pair.value);
	return;
});
app.put("/paired_data/:pair_key/value", async (request, response) => {
	var collection = db.collection("paired_data");
	if ((await collection.count({ key: request.params.pair_key })) !== 0) {
		await collection.updateOne(
			{ key: request.params.pair_key },
			{ $set: { value: request.body } }
		);
	} else {
		await collection.insertOne({ key: request.params.pair_key, value: request.body });
	}
	response.json("ok");
	return;
});
app.post("/collections/:collection_name", async (request, response) => {
	var inserted_id = (await db.collection(request.params.collection_name).insertOne(request.body))
		.insertedId;
	response.json({ inserted_id });
	return;
});
app.get("/collections/:collection_name", async (request, response) => {
	response.json(await db.collection(request.params.collection_name).find().toArray());
	return;
});
app.put("/collections/:collection_name/:field_name");
app.post("/files", async (request, response) => {
	return new Promise((resolve, reject) => {
		var f = formidable({ uploadDir: uploads_directory_path });
		f.parse(request, (error, fields, files) => {});
	});
});
app.get("/test", async (request, response) => {
	try {
		var a = await new Promise((res, rej) => {
			setTimeout(() => {
				rej();
			}, 3000);
		});
	} catch (error) {
		response.status(500).json("hamed is here but there is also an error");
	}
});
app.listen(env_vars.api_port, () => {
	console.log(`server started listening on port ${env_vars.api_port}`);
});
