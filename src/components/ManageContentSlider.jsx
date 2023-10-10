import { Fragment, useContext, useEffect, useState } from "react";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
import Select from "react-select";
export const ManageContentSlider = () => {
	var {
		cache,
		profiles_seed,
		rest_endpoint,
		configured_axios,
		request_new_transaction,
		request_new_thing,
	} = useContext(context);
	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	var content_slider_content = cache.find((ci) => ci.thing.type === "content_slider_content");
	var [current_breakpoint, set_current_breakpoint] = useState({
		value: "below_sm",
		label: "below_sm",
	});
	var breakpoints = ["below_sm", "sm", "md", "lg", "xl", "2xl"];

	async function upload_new_image() {
		var file = document.getElementById("new_image_input").files[0];
		if (file === undefined) {
			alert("عکسی انتخاب کنید");
			return;
		}
		var f = new FormData();
		f.append("file", file);
		var { new_file_id } = (
			await configured_axios({
				data: f,
				url: "/files",
				method: "post",
				onUploadProgress: (progressEvent) => {
					set_upload_state({
						percent: Math.round((progressEvent.loaded * 100) / progressEvent.total),
						is_uploading: true,
					});
				},
			})
		).data;
		set_upload_state({
			is_uploading: false,
			percent: undefined,
		});
		alert("با موفقیت انجام شد ");
		if (content_slider_content === undefined) {
			await request_new_thing({
				thing: {
					type: "content_slider_content",
					value: { [current_breakpoint.value]: [new_file_id] },
				},
				thing_privileges: { read: "*", write: [-1] },
			});
		} else {
			await request_new_transaction({
				thing_id: content_slider_content.thing_id,
				new_thing_creator: (prev) => {
					if (prev.value[current_breakpoint.value] === undefined) {
						prev.value[current_breakpoint.value] = [];
					}
					prev.value[current_breakpoint.value].push(new_file_id);
					return prev;
				},
			});
		}
	}
	async function delete_image(breakpoint, file_id) {
		if (window.confirm("ایا اطمینان دارید میخواهید این عکس را حذف کنید ؟؟") !== true) return;
		await request_new_transaction({
			new_thing_creator: (prev) => {
				var tmp = JSON.parse(JSON.stringify(prev));
				prev.value[breakpoint] = prev.value[breakpoint].filter((i) => i !== file_id);
				console.log(prev);
				return prev;
			},
			thing_id: content_slider_content.thing_id,
		});
		alert("با موفقیت انجام شد");
	}
	return (
		<>
			{upload_state.is_uploading && (
				<ProgressBarModal
					title="بارگذاری عکس"
					info="در حال بارگذاری عکس در اسلایدر صفحه اصلی"
					percentage={upload_state.percent}
				/>
			)}
			<div className="flex flex-col w-full ">
				<Section
					title="عکس های فعلی"
					className="mt-2"
					innerClassName="p-2  space-x-2"
				>
					{breakpoints.map((breakpoint) => {
						var file_ids = content_slider_content?.thing.value[breakpoint] || [];
						return (
							<Fragment key={breakpoint}>
								{breakpoint}
								<hr />
								{file_ids.length === 0 && "این سایز هیچ عکسی ندارد"}
								{file_ids.map((image_file_id) => {
									return (
										<div
											key={breakpoint + image_file_id}
											className="border border-blue-400 rounded w-40 aspect-auto mx-1"
										>
											<h1 className="text-center">#{image_file_id}</h1>
											<img
												src={calc_file_url(
													profiles_seed,
													rest_endpoint,
													image_file_id
												)}
											/>
											<button
												onClick={() =>
													delete_image(breakpoint, image_file_id)
												}
												className="text-center w-full h-6 bg-red-500 text-white duration-300 hover:bg-red-600 rounded-b"
											>
												حذف کردن این عکس
											</button>
										</div>
									);
								})}
								<br />
								<br />
							</Fragment>
						);
					})}
				</Section>
				<Section
					title="اپلود عکس جدید"
					className="mt-2"
					innerClassName="p-2"
				>
					<input
						id="new_image_input"
						type="file"
					/>
					<br />
					<br />
					<p>سایز این عکس:</p>
					<Select
						className="text-black"
						options={breakpoints.map((breakpoint) => ({
							value: breakpoint,
							label: breakpoint,
						}))}
						value={current_breakpoint}
						onChange={(newValue) => set_current_breakpoint(newValue)}
					/>
					<StyledDiv
						onClick={upload_new_image}
						className="mt-2"
					>
						اپلود این عکس
					</StyledDiv>
				</Section>
			</div>
		</>
	);
};
