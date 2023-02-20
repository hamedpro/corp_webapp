import { useEffect, useState } from "react";
import { custom_axios, get_company_info, modify_company_info } from "../../api/client";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
export function ManageIconsSection() {
	function fetch_data() {}
	useEffect(fetch_data, []);
	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	function config_and_open_input(icon_type) {
		var common_input = document.getElementById("common_input");
		common_input.onchange = () => upload_icon(icon_type);
		common_input.click();
	}
	async function upload_icon(icon_type) {
		var common_input = document.getElementById("common_input");
		if (common_input.files.length !== 1) {
			alert("یک فایل انتخاب کنید");
			return;
		}
		var f = new FormData();
		f.append("file", common_input.files[0]);

		var { inserted_id } = (
			await custom_axios({
				method: "post",
				data: f,
				url: "/files",
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
		await modify_company_info(
			icon_type === "favicon" ? "favicon_file_id" : "company_icon_file_id",
			inserted_id
		);
		//this lines below updates company info (if that's not created yet it creates it first )

		alert("با موفقیت انجام شد");
	}
	async function del_icon(icon_type) {
		var icon_property_name =
			icon_type === "square" ? "company_icon_file_id" : "favicon_file_id";
		var current_company_info_value = await get_company_info();
		if (!(icon_property_name in current_company_info_value)) {
			alert("this icon you want to delete doesnt even exist");
			return;
		}

		await custom_axios({
			url: `/files/${current_company_info_value[icon_property_name]}`,
			method: "delete",
		});
		await modify_company_info(icon_property_name, undefined);
		alert("با موفقیت انجام شد");
	}
	return (
		<>
			{upload_state.is_uploading && (
				<ProgressBarModal
					title="بارگذاری آیکون"
					info="فایل آیکون جدید در حال بارگذاری است ..."
					percentage={upload_state.percent}
				/>
			)}
			<input id="common_input" type="file" className="hidden" />
			<Section title="manage icons">
				<div className="flex flex-col items-start px-2">
					<StyledDiv className="mb-2" onClick={() => config_and_open_input("square")}>
						{ml({ en: "upload new square icon", fa: "بارگزاری آیکون مربع جدید" })}
					</StyledDiv>

					<StyledDiv className="mb-2" onClick={() => config_and_open_input("favicon")}>
						{ml({ en: "upload new favicon", fa: "ریز آیکون جدید" })}
					</StyledDiv>
					<StyledDiv className="mb-2" onClick={() => del_icon("square")}>
						{ml({ en: "delete square icon", fa: "حذف کردن آیکون مربع" })}
					</StyledDiv>
					<StyledDiv className="mb-2" onClick={() => del_icon("favicon")}>
						{ml({ en: "delete favicon", fa: "حذف کردن ریز آیکون" })}
					</StyledDiv>
				</div>
			</Section>
		</>
	);
}
