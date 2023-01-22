import { MongoClient } from "mongodb";
var client = new MongoClient("mongodb://pishroco_root:hamedpro82H@localhost:27017/pishroco_cwa");
var db = await client.db("pishroco_cwa");
console.log(Object.keys(db));
//db.auth('pishroco_root','hamed123456789')
console.log(await db.collection("users").find().toArray());
client.close();
