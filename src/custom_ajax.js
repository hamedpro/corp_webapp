export function object_to_url({ path, params = {} }) {
	var path_with_query = path + "?";
	Object.keys(params).forEach((key) => {
		path_with_query += key + "=" + params[key] + "&";
	});
	if (Object.keys(params).length != 0) {
		path_with_query = path_with_query.slice(0, -1);
		//it removes last "&" if its there
	}
	return path_with_query;
}
export async function customAjax({
	params = {},
	verbose = false, // if enabled it will console.log more data
	files = [], //setting a default value for it
}) {
	var method = "POST";
	var path = "http://" + window.location.hostname + ":4000";
	var path_with_query = object_to_url({
		path,
		params,
	});
	if (verbose) {
		console.log("path which is gonna be fetched: " + path_with_query);
	}
	//add files if presents
	var form = new FormData();
	for (var i = 0; i < files.length; i++) {
		form.append(i, files[i]);
	}

	var response = await fetch(path_with_query, {
		method,
		body: form,
	});
	if (!response.ok) {
		throw new Error("response.ok was not true");
	}
	var parsed_json;
	try {
		parsed_json = await response.json();
	} catch (e) {
		throw new Error("response.ok was true but response was invalid json");
	}
	if (parsed_json.errors.length !== 0) {
		throw new Error("errors field was not empty");
	} else {
		return parsed_json;
	}
}
/* how to use : 
use pass 2 functions to .then
1st func can get a data or ... arg
2nd func can get an error or ... arg  */
