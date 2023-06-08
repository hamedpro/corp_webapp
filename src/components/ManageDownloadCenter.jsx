import { useContext, useEffect } from "react";
import { useState } from "react";
import { custom_axios, get_collection, new_document } from "../../api/client";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { DownloadCenter } from "./DownloadCenter";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";
import Select from "react-select";
import { Loading } from "./Loading";
export function ManageDownloadCenter() {
	var [selected_download_center_category, set_selected_download_center_category] = useState();
	var { DownloadCenterItemsContextState, update_download_center_items_context_state } =
		useContext(DownloadCenterItemsContext);
	async function new_download_center_category() {
		await new_document({
			collection_name: "download_center_categories",
			document: {
				title: window.prompt("نام دسته بندی جدید را وارد کنید."),
			},
		});
		update_download_center_items_context_state();
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
		var input_files = document.getElementById("file_input").files;
		var form = new FormData();
		Object.keys(input_files).forEach((key) => {
			form.append(key, input_files[key]);
		});

		await custom_axios({
			url: `/?task_name=new_download_center_item&upload_dir=./uploaded/download_center&publisher_username=${window.localStorage.getItem(
				"username"
			)}&title=${document.getElementById("file_title").value}&description=${
				document.getElementById("file_description").value
			}&category_id=${selected_download_center_category.value}`,
			data: form,
			onUploadProgress: (e) => {
				set_upload_state({
					is_uploading: true,
					percent: Math.round((e.loaded * 100) / e.total),
				});
			},
		});
		set_upload_state({
			is_uploading: false,
			percent: undefined,
		});
		alert("با موفقیت انجام شد");
		update_download_center_items_context_state();
	}

	if (
		DownloadCenterItemsContextState === null ||
		DownloadCenterItemsContextState.download_center_categories === undefined
	) {
		return <Loading />;
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
			<div className="flex flex-col">
				<DownloadCenter admin_mode />
				<Section title="بارگذاری فایل جدید" className="mt-2" innerClassName="px-2">
					<input id="file_input" type={"file"} className="mt-1" />
					<p>نام فایل جدید را وارد کنید :‌</p>
					<StyledInput id="file_title" className="block" />
					<button onClick={new_download_center_category}>دسته بندی فایل جدید</button>
					<Select
						options={DownloadCenterItemsContextState.download_center_categories.map(
							(i) => ({
								value: i._id,
								label: i.title,
							})
						)}
						value={selected_download_center_category}
						onChange={set_selected_download_center_category}
					/>
					<p>توضیحی برای فایل جدید وارد کنید :‌</p>
					<StyledInput id="file_description" className="block" />
					<StyledDiv onClick={upload_files} className="w-fit mt-4 text-lg">
						بارگذاری این فایل
					</StyledDiv>
				</Section>
			</div>
		</>
	);
}
