import { useContext, useState } from "react";

import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
import { context } from "freeflow-react";
import { find_active_profile_seed } from "freeflow-core/dist/utils";
export function ManageIconsSection() {
	var {
		configured_axios,
		request_new_transaction,
		request_new_thing,
		cache,

		profiles_seed,
	} = useContext(context);
	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	function config_and_open_input(icon_type) {
		var common_input = document.getElementById("common_input");
		common_input.onchange = () => upload_icon(icon_type);
		common_input.click();
	}
	async function update_company_info(field, new_value) {
		var active_profile_seed = find_active_profile_seed(profiles_seed);
		if (active_profile_seed === undefined) {
			alert("ابتدا باید وارد حساب کاربری خود شوید.");
			return;
		}
		var current_company_info = cache.find((ci) => ci.thing.type === "company_info");
		if (current_company_info !== undefined) {
			await request_new_transaction({
				new_thing_creator: (prev) => {
					var tmp = {
						...prev,
						value: {
							...prev.value,
							[field]: new_value,
						},
					};

					return tmp;
				},

				thing_id: current_company_info.thing_id,
			});
		} else {
			await request_new_thing({
				thing: {
					type: "company_info",
					value: {
						[field]: new_value,
					},
				},
				thing_privileges: {
					read: "*",
					write: [-1],
				},
			});
		}
	}
	async function upload_icon(icon_type) {
		var common_input = document.getElementById("common_input");
		if (common_input.files.length !== 1) {
			alert("یک فایل انتخاب کنید");
			return;
		}
		var f = new FormData();
		f.append("file", common_input.files[0]);

		var { new_file_id } = (
			await configured_axios({
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
		await update_company_info(icon_type, new_file_id);
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
			<input
				id="common_input"
				type="file"
				className="hidden"
			/>
			<Section title="مدیریت آیکون ها">
				<div className="flex flex-col items-start px-2">
					<StyledDiv
						className="mb-2"
						onClick={() => config_and_open_input("company_icon_file_id")}
					>
						بارگذاری آيکون شرکت
					</StyledDiv>

					<StyledDiv
						className="mb-2"
						onClick={() => config_and_open_input("favicon_file_id")}
					>
						بارگذاری favicon جدید
					</StyledDiv>
					<StyledDiv
						className="mb-2"
						onClick={() => update_company_info("company_icon_file_id", undefined)}
					>
						حذف آیکون شرکت
					</StyledDiv>
					<StyledDiv
						className="mb-2"
						onClick={() => update_company_info("favicon_file_id", undefined)}
					>
						حذف favicon فعلی
					</StyledDiv>
				</div>
			</Section>
		</>
	);
}
