import { useEffect, useState } from "react";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { customAjax } from "../custom_ajax";
export function DownloadCenterItemsContextProvider({ children }) {
	var [DownloadCenterItemsContextState, setDownloadCenterItemsContextState] = useState(null);
	function update_download_center_items_context_state() {
		//this function gets data from server and updates the state
		//so you have not to handle data fetching and use setDownloadCenterItemsContextState manually
		customAjax({
			params: {
				task_name: "get_download_center_items",
			},
		}).then(
			(data) => {
				setDownloadCenterItemsContextState(data.result);
			},
			(e) => {
				alert(
					"در هنگام درخواست اطلاعات از سرور خطایی رخ داد. جزئیات خطا را در کنسول مرورگر مشاهده کنید."
				);
				console.log(e);
			}
		);
	}
	useEffect(update_download_center_items_context_state, []);
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
