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
	path = "http://" + window.location.hostname + ":4000",
	params = {},
	method = "GET",
	parse_json = true,
	verbose = false, // if enabled it will console.log more data
}) {
	var path_with_query = object_to_url({
		path,
		params,
	});
	if (verbose) {
		console.log({
			what_is_it: "a fetch request is going to be happened with this datails",
			path: path_with_query,
			method,
		});
	}
	var fetch_response = await fetch(path_with_query, {
		method,
	});
	if (fetch_response.status == 200) {
		if (parse_json) {
			var res_plain_text = await fetch_response.text();
			try {
				return JSON.parse(res_plain_text);
			} catch (error) {
				throw {
					error_type: "invalid_json",
					response_plain_text: res_plain_text,
				};
			}
		} else {
			return res_plain_text;
		}
	} else {
		throw "fetch request status code was not in 2xx range";
	}
}
/* how to use : 
use pass 2 functions to .then
1st func can get a data or ... arg
2nd func can get an error or ... arg  */
