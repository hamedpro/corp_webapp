import React, { useState, useEffect } from "react";
import { get_collection } from "../../../api/client.js";
import { customAjax } from "../../../src/custom_ajax.js";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import { FollowUsRow } from "../follow_us_row.jsx";
import { ImageSlider } from "../image_slider/comp.jsx";
import { Loading } from "../loading/comp.jsx";

export function CompanyInfo() {
	var [company_info, set_company_info] = useState(null);
	async function get_data() {
		var tmp = await get_collection({
			collection_name: "paired_data",
			filters: {
				key: "company_info",
			},
		});
		set_company_info(tmp.data[0] || {});
	}
	useEffect(get_data, []);
	var [rectangle_icon_src, set_rectangle_icon_src] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then((data) => {
			var rectangle_icon_file_name = data.result.find(
				(item) => item.split(".")[0] === "rectangle"
			);
			if (rectangle_icon_file_name !== undefined) {
				set_rectangle_icon_src(
					gen_link_to_file("./company_info/" + rectangle_icon_file_name)
				);
			} else {
				console.log("company rectangle icon is not uploaded yet");
			}
		});
	}, []);
	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex md:w-1/2 w-full px-2">
				<Loading is_loading={rectangle_icon_src === null}>
					<ImageSlider image_sources={[rectangle_icon_src]} />
				</Loading>
			</div>
			<div className="md:w-1/2 w-full">
				<Loading is_loading={company_info === null} />
				{company_info !== null && (
					<div className="flex-col">
						{[
							{
								label: ml({ en: "company name", fa: "نام شرکت" }),
								key: "name",
							},
							{
								label: ml({
									en: "company description",
									fa: "توضیحات شرکت",
								}),
								key: "description",
							},
							{
								label: ml({ en: "email address", fa: "آدرس ایمیل شرکت" }),
								key: "email_address",
							},
							{
								label: ml({
									en: "landline phone number",
									fa: "شماره تلفن ثابت شرکت",
								}),
								key: "landline_phone_number",
							},
							{
								label: ml({
									en: "mobile phone number",
									fa: "شماره موبایل شرکت ",
								}),
								key: "mobile_phone_number",
							},
							{
								label: ml({ en: "address", fa: "آدرس" }),
								key: "address",
							},
						].map((item, index) => {
							return (
								<React.Fragment key={index}>
									<span className="text-stone-600">{item.label} : </span>
									<span className="text-lg">{company_info[item.key]}</span>
									<br />
								</React.Fragment>
							);
						})}
						<FollowUsRow
							instagram={company_info.instagram}
							telegram={company_info.telegram}
							twitter={company_info.twitter}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
