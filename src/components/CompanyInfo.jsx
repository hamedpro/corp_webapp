import React, { useState, useEffect } from "react";
import { get_company_info } from "../../api/client.js";
import { multi_lang_helper as ml } from "../common.js";
import { FollowUsRow } from "./FollowUsRow.jsx";
import { ImageSlider } from "./ImageSlider.jsx";
import { Loading } from "./Loading.jsx";

export function CompanyInfo() {
	var [company_info, set_company_info] = useState(null);
	var [rectangle_icon_src, set_rectangle_icon_src] = useState(null);
	async function get_data() {
		var tmp = await get_company_info();
		set_company_info(tmp);
		if ("company_icon_file_id" in tmp) {
			set_rectangle_icon_src(
				new URL(`/files/${tmp.company_icon_file_id}`, vite_api_endpoint).href
			);
		}
	}
	useEffect(() => {
		get_data();
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