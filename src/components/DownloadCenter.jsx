import { Delete, Download, Info } from "@mui/icons-material";
import { Fragment, useContext } from "react";
import { Alert } from "./Alert";
import { Loading } from "./Loading";
import { Section } from "./Section";
import { context } from "freeflow-react";
import JsFileDownloader from "js-file-downloader";
import { current_user, current_user_id, find_active_profile_seed } from "freeflow-core/dist/utils";

export function DownloadCenter({}) {
	var { cache, rest_endpoint, profiles_seed } = useContext(context);
	var current_user = current_user_id(profiles_seed);
	var admin_mode = current_user === -1;
	function Items({ cache_items }) {
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
					{cache_items.map((ci) => (
						<tr
							className="py-2 border-b border-blue-400"
							key={ci.thing_id}
						>
							<td className="px-2 py-2 text-white">{ci.thing.value.title}</td>
							<td className="px-2 py-2 text-white">{ci.thing.value.description}</td>
							<td>
								{admin_mode && (
									<span
										onClick={() => delete_download_center_item(ci.thing_id)}
										className="px-1 block text-black cursor-pointer bg-blue-100 hover:bg-blue-500 w-fit hover:text-white rounded"
									>
										<Delete />
										حذف کردن
									</span>
								)}

								<button
									onClick={() => {
										var { originalFilename } = cache.find(
											(i) => i.thing_id === ci.thing.value.file_id
										).thing.value;
										var jwt = find_active_profile_seed(profiles_seed).jwt;
										new JsFileDownloader({
											url: new URL(
												`/files/${ci.thing.value.file_id}`,
												rest_endpoint
											).href,
											headers: jwt ? [{ name: "jwt", value: jwt }] : [],
											method: "GET",
											contentType: "application/json",
											filename: originalFilename,
										});
									}}
									className="px-1 block bg-blue-100 text-black hover:bg-blue-500 w-fit hover:text-white rounded my-1 duration-200"
								>
									<Download />
									دانلود
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	function delete_download_center_item(title) {
		alert("این ویژگی بعدا اضافه می شود.");
		return;
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

	return (
		<>
			<Section
				title="فایل های قابل دانلود"
				className="mt-1"
			>
				<div className="px-3">
					<Alert
						icon={<Info />}
						className="mb-2 text-blue-900"
					>
						برای دانلود هر مورد روی آن مورد کلیک کنید و این گزینه را انتخاب کنید :‌
						"save link as ..."
					</Alert>

					{cache
						.filter((ci) => ci.thing.type === "download_center_category")
						.map((category, index) => {
							return (
								<Fragment key={category.thing_id}>
									{
										<Fragment key={category.thing_id}>
											<h1 className="text-3xl mb-1 text-center rounded bg-blue-500 text-white">
												{category.thing.value.title}
											</h1>

											<Items
												cache_items={cache.filter(
													(ci) =>
														ci.thing.type === "download_center_item" &&
														ci.thing.value.category_id ===
															category.thing_id
												)}
											/>
										</Fragment>
									}
								</Fragment>
							);
						})}
				</div>
			</Section>
		</>
	);
}
