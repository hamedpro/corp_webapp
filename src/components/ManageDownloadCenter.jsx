import { useContext } from "react";
import { useState } from "react";
import { custom_axios } from "../../api/client";
import { DownloadCenterItemsContext } from "../DownloadCenterItemsContext";
import { DownloadCenter } from "./DownloadCenter";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";

export function ManageDownloadCenter() {
	var { DownloadCenterItemsContextState, update_download_center_items_context_state } =
		useContext(DownloadCenterItemsContext);
	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	async function upload_files() {
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
			}`,
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
