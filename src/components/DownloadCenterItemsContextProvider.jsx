import { useEffect, useState } from "react";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { customAjax } from "../custom_ajax";
import { get_collection } from "../../api/client";
export function DownloadCenterItemsContextProvider({ children }) {
	var [DownloadCenterItemsContextState, setDownloadCenterItemsContextState] = useState(null);
	async function update_download_center_items_context_state() {
		//this function gets data from server and updates the state
		//so you have not to handle data fetching and use setDownloadCenterItemsContextState manually
		var download_center_items = (
			await customAjax({
				params: {
					task_name: "get_download_center_items",
				},
			})
		).result;

		var download_center_categories = (
			await get_collection({
				collection_name: "download_center_categories",
				filters: {},
			})
		).data;
		setDownloadCenterItemsContextState({ download_center_categories, download_center_items });
	}
	useEffect(() => {
		update_download_center_items_context_state();
	}, []);
	return (
		<DownloadCenterItemsContext.Provider
			value={{
				DownloadCenterItemsContextState,
				setDownloadCenterItemsContextState,
				update_download_center_items_context_state,
			}}
		>
			{children}
		</DownloadCenterItemsContext.Provider>
	);
}
