export async function customAjax({
	params = {},
	files = [], //setting a default value for it
	route = "/", // route should start with "/" -> example : "/products/2"
}) {
	var method = "POST";
	var base_path = "http://" + window.location.hostname + ":4000";

	var response;
	if (files.length !== 0) {
		var form = new FormData();
		for (var i = 0; i < files.length; i++) {
			form.append(i, files[i]);
		}
		response = await fetch(base_path + "?task_name=" + params.task_name, {
			method,
			body: form,
		});
	} else {
		var path = base_path + route;
		response = await fetch(path, {
			method,
			body: JSON.stringify(params),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

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
		throw {
			details: "errors field was not empty",
			errors: parsed_json.errors,
		};
	} else {
		return parsed_json;
	}
}
/* how to use : 
use pass 2 functions to .then
1st func can get a data or ... arg
2nd func can get an error or ... arg  */
