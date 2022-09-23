export async function customAjax({
	params = {},
	files = [], //setting a default value for it
	route = "/", // route should start with "/" -> example : "/products/2"
	headers = {},
	super_admin_access_token = null,
	jwt = null,
	verbose = false,
}) {
	var method = "POST";
	var base_path = window.api_endpoint;

	var response;
	if (files.length !== 0) {
		var form = new FormData();
		for (var i = 0; i < files.length; i++) {
			form.append(i, files[i]);
		}
		var path = base_path + "?";
		Object.keys(params).forEach((key, index) => {
			path += key + "=" + params[key] + "&";
		});
		if (verbose) {
			console.log("this path is going to be fetched " + path);
		}
		response = await fetch(path, {
			method,
			body: form,
		});
	} else {
		headers = {
			"Content-Type": "application/json",
			...headers,
		};
		if (jwt !== null) {
			headers["jwt"] = jwt;
		}

		if (super_admin_access_token !== null) {
			headers["super_admin_access_token"] = super_admin_access_token;
		}

		var path = base_path + route;
		if (verbose) {
			console.log("this path is going to be fetched " + path);
		}
		response = await fetch(path,{
			method,
			body: JSON.stringify(params),
			headers,
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
			details: "errors field of the response was not empty",
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
