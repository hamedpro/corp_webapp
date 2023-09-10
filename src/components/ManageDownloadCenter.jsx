import { useContext, useState } from "react";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";
import Select from "react-select";
import { context } from "freeflow-react";
import { find_active_profile } from "freeflow-core/dist/utils";
export function ManageDownloadCenter() {
	var [selected_download_center_category, set_selected_download_center_category] = useState();
	var { cache, unresolved_cache, rest_endpoint, request_new_thing, profiles, configured_axios } =
		useContext(context);
	var current_profile = find_active_profile(profiles);

	async function new_download_center_category() {
		await request_new_thing({
			thing: {
				type: "download_center_category",
				value: { title: window.prompt("عنوان دسته بندی جدید را وارد کنید") },
			},
			thing_privileges: { read: "*", write: [-1] },
		});
	}

	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	async function upload_files() {
		if (selected_download_center_category === undefined) {
			alert("باید یک دسته بندی برای این فایل انتخاب کنید");
			return;
		}
		var [file] = document.getElementById("file_input").files;
		if (file === undefined) {
			alert("هیچ فایلی انتخاب نشده است");
			return;
		}

		var form = new FormData();
		form.append(
			"file_privileges",
			JSON.stringify({
				read: "*",
			})
		);
		form.append("file", file);
		var { new_file_id } = (
			await configured_axios({
				method: "post",
				url: "/files",
				data: form,
				onUploadProgress: (e) => {
					set_upload_state({
						is_uploading: true,
						percent: Math.round((e.loaded * 100) / e.total),
					});
				},
			})
		).data;
		set_upload_state({
			is_uploading: false,
			percent: undefined,
		});
		var result = await request_new_thing({
			thing: {
				type: "download_center_item",
				value: {
					title: document.getElementById("file_title").value,
					description: document.getElementById("file_description").value,
					category_id: selected_download_center_category.value,
					file_id: new_file_id,
				},
			},
			thing_privileges: { read: "*", write: [current_profile.user_id] },
		});
		console.log(result);
		alert("با موفقیت انجام شد");
	}

	return (
		<>
			{upload_state.is_uploading && (
				<ProgressBarModal
					title="بارگذاری فایل"
					info="فایل جدید در حال بارگذاری روی سرور است ..."
					percentage={upload_state.percent}
				/>
			)}
			<div className="flex flex-col w-full">
				<Section
					title="بارگذاری فایل جدید"
					className="mt-2"
					innerClassName="px-2"
				>
					<input
						id="file_input"
						type={"file"}
						className="mt-1"
					/>
					<p>نام فایل جدید را وارد کنید :‌</p>
					<StyledInput
						id="file_title"
						className="block"
					/>
					<p className="mt-3">دسته بندی این فایل را انتخاب کنید:</p>
					<Select
						className="w-full text-black"
						options={cache
							.filter((ci) => ci.thing.type === "download_center_category")
							.map((i) => ({
								value: i.thing_id,
								label: i.thing.value.title,
							}))}
						value={selected_download_center_category}
						onChange={set_selected_download_center_category}
					/>
					<div>
						<span className="pl-2">
							در صورتی که دسته بندی مورد نظر موجود نیست از اینجا بسازید.
						</span>
						<button
							className="border border-blue-400 my-2 px-2 rounded"
							onClick={new_download_center_category}
						>
							دسته بندی فایل جدید
						</button>
					</div>

					<p>توضیحی برای فایل جدید وارد کنید :‌</p>
					<StyledInput
						id="file_description"
						className="block w-1/2"
					/>
					<StyledDiv
						onClick={upload_files}
						className="w-fit mt-4 text-lg"
					>
						بارگذاری این فایل
					</StyledDiv>
				</Section>
			</div>
		</>
	);
}
