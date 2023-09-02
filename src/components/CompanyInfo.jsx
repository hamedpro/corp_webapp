import React, { useState, useEffect } from "react";

import { multi_lang_helper as ml } from "../common.js";
import { FollowUsRow } from "./FollowUsRow.jsx";
import { ImageSlider } from "./ImageSlider.jsx";
import { Loading } from "./Loading.jsx";
import { CustomImageSlider } from "./CustomImageSlider.jsx";

export function CompanyInfo({ type }) {
	//type is either "about_us" or "contact_us"
	//the left side will be different according to that value

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
		<div className="flex flex-col md:flex-row relative">
			<div
				className="w-full md:w-1/2 flex md:block justify-center"
				style={{ height: "40vh" }}
			>
				{rectangle_icon_src === null && "عکسی برای نمایش موجود نیست"}
				<div
					className="flex w-full h-full md:justify-end justify-center items-center mr-2"
					dir="rtl"
				>
					<CustomImageSlider images_sources={[rectangle_icon_src]} />
				</div>
			</div>
			<div className="w-full md:w-1/2 px-2">
				<Loading is_loading={company_info === null} />
				{company_info !== null &&
					(type === "about_us" ? (
						<>
							<br />
							<span className="mt-3">{company_info.company_introduction}</span>
						</>
					) : (
						<div className="flex-col relative pb-10 px-2">
							{[
								{
									label: ml({ en: "company name", fa: "نام شرکت" }),
									key: "name",
								},
								{
									label: ml({ en: "email address", fa: "ایمیل" }),
									key: "email_address",
								},
								{
									label: ml({
										en: "landline phone number",
										fa: "تلفن",
									}),
									key: "landline_phone_number",
								},
								{
									label: ml({
										en: "mobile phone number",
										fa: "موبایل",
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

							<div className="absolute bottom-0 right-0">
								<FollowUsRow
									className="px-0"
									instagram={company_info.instagram}
									telegram={company_info.telegram}
									twitter={company_info.twitter}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
