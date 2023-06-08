import { Delete, Download, Info } from "@mui/icons-material";
import { Fragment, useContext } from "react";
import { customAjax } from "../custom_ajax";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { Alert } from "./Alert";
import { Loading } from "./Loading";
import { Section } from "./Section";

export function DownloadCenter({ admin_mode = false }) {
	function Items({ items }) {
		return (
			<table className="border border-blue-400 w-full mb-4 p-3 rounded">
				<thead className="p-3">
					<tr className="text-right">
						<th className="px-2 w-1/3">نام</th>
						<th className="px-2">توضیحات</th>
						<th>گزینه ها</th>
					</tr>
				</thead>
				<tbody className="p-3">
					{items.map((item) => (
						<tr className="py-2 border-b border-blue-400" key={Math.random() * 100000}>
							<td className="px-2 py-2">{item.file_path}</td>
							<td className="px-2 py-2">{item.description}</td>
							<td>
								{admin_mode && (
									<span
										key={Math.random() * 10000}
										onClick={() => delete_download_center_item(item.file_name)}
										className="px-1 block bg-blue-100 hover:bg-blue-500 w-fit hover:text-white rounded"
									>
										<Delete />
										حذف کردن
									</span>
								)}

								<a
									key={Math.random() * 10000}
									href={
										new URL(
											`/download_center/${item.file_path}`,
											vite_api_endpoint
										).href
									}
									download
									className="px-1 block bg-blue-100 hover:bg-blue-500 w-fit hover:text-white rounded my-1"
								>
									<Download />
									دانلود
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
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
								{DownloadCenterItemsContextState.download_center_items.filter(
									(i) => i.category_id === category._id
								).length !== 0 && (
									<Fragment key={category._id}>
										<h1 className="text-3xl mb-1 text-center rounded bg-blue-500 text-white">
											{category.title}
										</h1>

										<Items
											items={DownloadCenterItemsContextState.download_center_items.filter(
												(i) => i.category_id === category._id
											)}
										/>
									</Fragment>
								)}
							</Fragment>
						);
					})}
				</div>
			</Section>
		</>
	);
}
