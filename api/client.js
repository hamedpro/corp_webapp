import axios from "axios";
export var custom_axios = axios.create({
	baseURL: vite_api_endpoint,
	method: "post",
});

export var get_collection = ({ collection_name, filters }) => {
	return custom_axios({
		url: "/api-v2",
		headers: {
			task: "get_collection",
		},
		data: {
			collection_name,
			filters,
		},
	});
};

export var delete_document = ({ collection_name, filters }) =>
	custom_axios({
		url: "/api-v2",
		headers: { task: "delete_document" },
		data: {
			filters,
			collection_name,
		},
	});
export var new_document = ({ collection_name, document }) =>
	custom_axios({
		url: "/api-v2",
		headers: { task: "new_document" },
		data: {
			collection_name,
			document,
		},
		method: "post",
	});
export var update_document = ({ collection, update_filter, update_set }) =>
	custom_axios({
		url: "/api-v2",
		headers: { task: "update_document" },
		data: {
			collection,
			update_filter,
			update_set,
		},
	});
