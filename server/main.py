from fastapi import FastAPI, Body, File, UploadFile,HTTPException,UploadFile,Body
import shutil
from fastapi.responses import FileResponse
from bson import ObjectId
from utils import find_asset_file_path, push_new_asset
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],  # Add the exposedHeaders option
)


mongodb_client = MongoClient("mongodb://127.0.0.1:27017")
db = mongodb_client["corp_webapp"]


@app.get("/collections/{collection_name}")
def get_collection_data(collection_name: str):
    collection = db[collection_name]
    documents = list(collection.find())
    data = []
    for doc in documents:
        doc = {"id": str(doc["_id"]), **doc}
        del doc['_id']
        data.append(doc)
    return data


@app.put("/collections/{collection_name}/{id}")
def update_document(collection_name: str, id: str, patch: dict = Body(...) ):
    collection = db[collection_name]
    update_result = collection.update_one(
        {"_id": ObjectId(id)}, {"$set": patch})
    return {"updated_count": update_result.modified_count}

@app.delete("/collections/{collection_name}/{id}")
def update_document(collection_name: str, id: str ):
    collection = db[collection_name]
    collection.delete_one(
        {"_id": ObjectId(id)})
    return "deleted"

@app.post("/collections/{collection_name}")
def insert_document(collection_name: str, value: dict = Body(...)):
    collection = db[collection_name]
    result = collection.insert_one(value)
    return {"inserted_id": str(result.inserted_id)}


@app.post("/files/")
async def upload_file(file: UploadFile = File(...)):
    file_path = file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    asset_id = push_new_asset(file_path, file.filename,  delete_orig_file=True)
    return {"filename": file.filename, "asset_id": asset_id}


@app.get("/files/{file_id}")
def download_file(file_id):
    file_path, filename = find_asset_file_path(int(file_id))
    if file_path == None:
        raise HTTPException(
            status_code=404, detail=f"could not find an asset with asset_id = {file_id}")
    return FileResponse(file_path, filename=filename)
