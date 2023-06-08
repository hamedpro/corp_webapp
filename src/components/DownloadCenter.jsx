import { Download, Info } from "@mui/icons-material";
import { Fragment, useContext } from "react";
import { customAjax } from "../custom_ajax";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { Alert } from "./Alert";
import { Loading } from "./Loading";
import { Section } from "./Section";

export function DownloadCenter({ admin_mode = false }) {
	function Item({ item }) {
		return (
			<div
				key={Math.round(Math.random() * 10000)}
				className=" border rounded border-stone-400 p-1 mb-1 "
			>
				<div className="flex space-x-1">
					<a
						key={Math.random() * 10000}
						href={new URL(`/download_center/${item.file_path}`, vite_api_endpoint).href}
						download
						className="px-1 block bg-blue-100 hover:bg-blue-500 w-fit hover:text-white rounded"
					>
						<Download />
						{item.file_path}
					</a>
					{admin_mode && (
						<>
							<span>|</span>
							<span
								className="h-full bg-red-100 hover:text-white hover:bg-red-500 rounded px-1"
								onClick={() => delete_download_center_item(item.file_name)}
							>
								delete
							</span>
						</>
					)}
				</div>
				<span className="block text-stone-700 mt-1">توضیحات : {item.description}</span>
			</div>
		);
	}
	var { DownloadCenterItemsContextState, update_download_center_context_state } = useContext(
		DownloadCenterItemsContext
	);

	function delete_download_center_item(title) {
		customAjax({
			params: {
				task_name: "remove_download_center_item",
				title,
			},
		})
			.then(
				(data) => alert("done!"),
				(e) => {
					alert("something went wrong");
					console.log(e);
				}
			)
			.finally(update_download_center_context_state);
	}
	if (DownloadCenterItemsContextState === null) {
		return <Loading />;
	}
	return (
		<>
			<Section title="فایل های قابل دانلود" className="mt-1">
				<div className="px-3">
					<Alert icon={<Info />} className="mb-2">
						برای دانلود هر مورد روی آن مورد کلیک کنید و این گزینه را انتخاب کنید :‌
						"save link as ..."
					</Alert>

					{[
						...DownloadCenterItemsContextState.download_center_categories,
						{ _id: null, title: "بدون دسته بندی" },
					].map((category, index) => {
						return (
							<Fragment key={category._id}>
								<h1>{category.title}</h1>
								{DownloadCenterItemsContextState.download_center_items
									.filter((i) => i.category_id === category._id)
									.map((item, index2) => {
										return <Item item={item} key={Math.random() * 10000} />;
									})}
							</Fragment>
						);
					})}
				</div>
			</Section>
		</>
	);
}
