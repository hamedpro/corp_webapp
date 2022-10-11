import { Download, Info } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { customAjax } from "../custom_ajax";
import { CustomRow } from "./admin_dashboard/custom_row";
import { Alert } from "./alert/comp";
import { Loading } from "./loading/comp";
import Section from "./section/comp";
export function DownloadCenter({ admin_mode = false }) {
	var [download_center_items, set_download_center_items] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_download_center_items",
			},
		}).then(
			(data) => {
				set_download_center_items(data.result);
			},
			(e) => {
				alert("something went wrong while requesting data from server");
				console.log(e);
			}
		);
	}
	useEffect(fetch_data, []);
    function delete_download_center_item(title) {
        customAjax({
            params: {
                task_name: "remove_download_center_item",
                title
            }
        }).then(data => alert('done!'), e => {
            alert('something went wrong')
            console.log(e)
        }).finally(fetch_data)
    }
	return (
		<>
			{download_center_items === null ? (
				<Loading />
			) : (
				<Section title="downloadble items" className="mt-1 mx-1">
					<div className="px-3">
						<Alert icon={<Info />} className="mb-2">
							to download each item right click on that and click "save link as ..."
						</Alert>
						{download_center_items
							.map((item, index) => {
								return (
									<div key={index} className=" border rounded border-stone-400 p-1 mb-1 ">
										<div className="flex space-x-1">
											<a
												key={index}
												href={
													new URL(
														`/download_center/${item.file_path}`,
														window.api_endpoint
													).href
												}
												download
												className="px-1 block bg-blue-100 hover:bg-blue-500 w-fit hover:text-white rounded"
											>
												<Download />
												downlaod "{item.file_path}"
											</a>
                                            {admin_mode && (
                                                <>
                                                    <span>|</span>
                                                    <span
                                                        className="h-full bg-red-100 hover:text-white hover:bg-red-500 rounded px-1"
                                                        onClick={()=>delete_download_center_item(item.file_name)}
                                                    >delete</span>
                                                </>
                                            )}
										</div>
										<span className="block text-stone-700 mt-1">description : {item.description }</span>

                                        <span className="block text-stone-500 text-sm mt-1">updated in {new Date(Number(item.time)).toString()} by @{item.publisher_username}</span>
									</div>
								);
							})}
					</div>
				</Section>
			)}
		</>
	);
}
