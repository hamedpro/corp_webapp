import express, { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
import formidable from "formidable";
import { MongoClient, ObjectId } from "mongodb";
import { homedir } from "os";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
	next();
});
const port = 10000;

const assetsDir = path.resolve(homedir(), "corp_webapp_storage");
if (!fs.existsSync(assetsDir)) {
	fs.mkdirSync(assetsDir);
}

const mongodbClient = new MongoClient("mongodb://127.0.0.1:27017");
const db = mongodbClient.db("corp_webapp");

app.get("/collections/:collection_name", async (req: Request, res: Response) => {
	const collection = db.collection(req.params.collection_name);
	var docs = await collection.find().toArray();
	const data = docs.map((doc) => ({ id: doc._id.toString(), ...doc }));
	res.json(data);
});

app.put("/collections/:collection_name/:id", async (req: Request, res: Response) => {
	const collection = db.collection(req.params.collection_name);
	await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
	res.json("done");
});

app.delete("/collections/:collection_name/:id", async (req: Request, res: Response) => {
	const collection = db.collection(req.params.collection_name);
	await collection.deleteOne({ _id: new ObjectId(req.params.id) });
	res.json("done");
});

app.post("/collections/:collection_name", async (req: Request, res: Response) => {
	const collection = db.collection(req.params.collection_name);
	var result = await collection.insertOne(req.body);
	res.json({ inserted_id: result.insertedId.toString() });
});

app.post("/files", async (req: Request, res: Response) => {
	const uploadsDir = assetsDir;
	var new_file_id: number;
	if (fs.readdirSync(uploadsDir).length === 0) {
		new_file_id = 1;
	} else {
		var existing_file_ids: number[] = fs
			.readdirSync(uploadsDir)
			.map((filenname) => Number(filenname.split("-")[0]));
		//console.log(fs.readdirSync(uploadsDir));
		new_file_id = Math.max(...existing_file_ids) + 1;
	}

	var f = formidable({
		uploadDir: assetsDir,
	});
	f.parse(req, (err, fields, files) => {
		if (err) {
			res.status(400).json({ error: err });
			return;
		}
		var file = files["file"]?.[0];
		if (file === undefined) {
			res.status(400).json({ error: "No file" });
			return;
		}
		var old_file_path = file.filepath;
		if (!file.originalFilename) {
			res.status(400).json({ error: "No filename" });
			return;
		}
		var new_filename = `${new_file_id}-${file.originalFilename}`;
		var new_file_path = path.join(uploadsDir, new_filename);
		fs.renameSync(old_file_path, new_file_path);
		res.json({ asset_id: new_file_id, filename: new_filename });
	});
});
app.get("/files/:file_id", (req: Request, res: Response) => {
	var file_id = req.params.file_id;
	var filenames = fs.readdirSync(assetsDir);
	var filename = filenames.find((filename) => filename.startsWith(file_id));
	if (filename === undefined) {
		res.status(404).json({ error: "File not found" });
		return;
	}
	var target_abs_filepath = path.resolve(assetsDir, filename);
	//console.log(path.resolve(assetsDir, filename));
	res.download(target_abs_filepath, filename);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
