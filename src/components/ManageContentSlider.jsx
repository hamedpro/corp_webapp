import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { ProgressBarModal } from "./ProgressBarModal";
import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
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
					value: [new_file_id],
				},
				thing_privileges: { read: "*", write: [-1] },
			});
		} else {
			await request_new_transaction({
				thing_id: content_slider_content.thing_id,
				new_thing_creator: (prev) => ({
					...prev,
					value: prev.value.concat([new_file_id]),
				}),
			});
		}
	}
	async function delete_image(file_id) {
		if (window.confirm("ایا اطمینان دارید میخواهید این عکس را حذف کنید ؟؟") !== true) return;
		await request_new_transaction({
			new_thing_creator: (prev) => ({
				...prev,
				value: prev.value.filter((image_file_id) => image_file_id !== file_id),
			}),
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
					innerClassName="p-2 flex space-x-2"
				>
					{(content_slider_content?.thing.value || []).map((image_file_id) => {
						return (
							<div
								key={image_file_id}
								className="border border-blue-400 rounded w-40 aspect-auto mx-1"
							>
								<h1 className="text-center">#{image_file_id}</h1>
								<img
									src={calc_file_url(profiles_seed, rest_endpoint, image_file_id)}
								/>
								<button
									onClick={() => delete_image(image_file_id)}
									className="text-center w-full h-6 bg-red-500 text-white duration-300 hover:bg-red-600 rounded-b"
								>
									حذف کردن این عکس
								</button>
							</div>
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
