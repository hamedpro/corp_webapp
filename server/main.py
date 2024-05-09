from fastapi import FastAPI, Body, File, UploadFile,HTTPException,UploadFile,Body
import shutil
from fastapi.responses import FileResponse
from bson import ObjectId
from utils import find_asset_file_path, push_new_asset
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os
from shutil import copyfile

assets_dir = os.path.expanduser(
    "~/corp_webapp_storage")
if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)


def push_new_asset(filepath, filename,  delete_orig_file=False):
    # Find filenames matching the pattern
    file_numbers = []
    for f in os.listdir(assets_dir):
        file_numbers.append(int(f.split("-")[0]))

    # Print the maximum number, handling the empty list case
    if file_numbers:
        max_number = max(file_numbers)
    else:
        max_number = 0
    copyfile(filepath, os.path.join(
        assets_dir, f"{max_number + 1}-{filename}"))

    """ assets_json_filepath  = os.path.expanduser('~/next_step_assets.json')		
	if not os.path.exists(assets_json_filepath):
		with open(assets_json_filepath, "w") as f:
			json.dump({}, f)
	else:
		with open(assets_json_filepath, "r+") as f:  # Open for reading and writing
			data = json.load(f)  # Load the existing data
			data[max_number+ 1] = description
			f.seek(0)  # Reset file pointer to beginning
			json.dump(data, f, indent=4)  # Re-dump the data, potentially with formatting """
    if delete_orig_file:
        os.remove(filepath)
    return max_number + 1

def find_asset_file_path(asset_id: int):
    existing_filenames = os.listdir(assets_dir)
    tmp = [f for f in existing_filenames if f.split('-')[0] == str(asset_id)]
    if len(tmp) == 0:
        return None, None
    else:
        # return type: abs file path , filename (including extension)
        return os.path.join(assets_dir, tmp[0]), tmp[0]
   

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
