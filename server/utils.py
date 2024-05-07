from datetime import datetime
import os
from shutil import copyfile
import platform
import cpuinfo

assets_dir = os.path.expanduser(
    "~/corp_webapp_storage")
if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)




def epoch_timestamp():
    return int(datetime.now().timestamp() * 1000)

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
def custom_platform_info():
    platform_info = platform.platform()
    cpu_info = cpuinfo.get_cpu_info()
    #gpu_info = torch.cuda.get_device_properties(0) if torch.cuda.is_available() else "No GPU available"

    return {
        "platform_info" : platform_info,
        "cpu_name" : cpu_info['brand_raw']
    }
   