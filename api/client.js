import axios from "axios";
export async function custom_axios({
	task,
	body = {},
	content_type_json = true,
	responseType = undefined,
	route = "/",
}) {
	var api_endpoint = window.api_endpoint;
	var method = "POST"; // case insensitive,
	var headers = {
		task,
		api_version: 2,
	};
	if (content_type_json) {
		headers["Content-Type"] = "application/json";
	}
	var conf = {
		url: new URL(route, api_endpoint).href,
		method: method.toUpperCase(),
		data: body,
		headers,
	};
	if (responseType) {
		conf.responseType = responseType;
	}
	var response = await axios(conf);

	return response.data;
}
var mongo_db_filter_function = ({ item, filters }) => {
	//it works like how find method of mongo db works.
	//for example when filters = {_id :"foo",user_id : "bar"} it returns true only if (item._id == "foo" && user_id == "bar")
	//note : item._id must be an string (.toArray() of mongo db also does this conversion)
	for (var filter in filters) {
		if (item[filter] !== filters[filter]) {
			return false;
		}
	}
	return true;
};
export var get_collection = ({ collection_name, filters, global_data }) => {
	if (global_data !== undefined) {
		return global_data.all[collection_name].filter((item) =>
			mongo_db_filter_function({ item, filters })
		);
	} else {
		return custom_axios({
			task: "get_collection",
			body: {
				collection_name,
				filters,
			},
		});
	}
};

export var delete_document = ({ collection_name, filters }) =>
	custom_axios({
		task: "delete_document",
		body: {
			filters,
			collection_name,
		},
	});
export var new_document = ({ collection_name, document }) =>
	custom_axios({
		task: "new_document",
		body: {
			collection_name,
			document,
		},
	});
export var update_document = ({ collection, update_filter, update_set }) =>
	custom_axios({
		task: "update_document",
		body: {
			collection,
			update_filter,
			update_set,
		},
	});
