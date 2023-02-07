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
export var modify_company_info = async (property_name, new_value) => {
	//if company_info is not initialized yet it creates it first and set that <property> to <new_value> inside it
	//otherwise it overrides that <property> with given <new_value>
	var current_company_info_pair = (
		await get_collection({
			collection_name: "paired_data",
			filters: { key: "company_info" },
		})
	).data[0];
	if (current_company_info_pair === undefined) {
		//when there is not any pair with key = company_info
		var value = {};
		value[property_name] = new_value;
		await new_document({
			collection_name: "paired_data",
			document: { key: "company_info", value },
		});
	} else {
		//when there is an existing company_info
		var update_set = { value: { ...current_company_info_pair.value } };
		update_set["value"][property_name] = new_value;
		await update_document({
			collection: "paired_data",
			update_filter: {
				key: "company_info",
			},
			update_set,
		});
	}
};
