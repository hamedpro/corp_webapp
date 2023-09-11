import React, { useState, useEffect, useContext } from "react";
import { FollowUsRow } from "./FollowUsRow.jsx";
import { CustomImageSlider } from "./CustomImageSlider.jsx";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils.js";

export function CompanyInfo({ type }) {
	//type is either "about_us" or "contact_us"
	//the left side will be different according to that value

	var { cache, profiles_seed, rest_endpoint } = useContext(context);
	var company_info = cache.find((ci) => ci.thing.type === "company_info");

	var company_icon_url;
	if (company_info?.thing.value.company_icon_file_id !== undefined) {
		company_icon_url = calc_file_url(
			profiles_seed,
			rest_endpoint,
			company_info?.thing.value.company_icon_file_id
		);
	}
	return (
		<div className="flex flex-col md:flex-row relative">
			<div className="w-full md:w-1/2 flex md:block justify-center">
				<div
					className="flex w-full h-fulljustify-center items-center px-2"
					dir="rtl"
				>
					{company_icon_url === undefined ? (
						"عکسی برای نمایش موجود نیست"
					) : (
						<CustomImageSlider images_sources={[company_icon_url]} />
					)}
				</div>
			</div>
			<div className="w-full md:w-1/2 px-2 text-white">
				{company_info !== undefined &&
					(type === "about_us" ? (
						<>
							<h1 className="text-2xl">درباره شرکت</h1>
							<span className="mt-3">
								{company_info.thing.value.company_introduction ||
									"توضیحات شرکت هنوز ثبت نشده است."}
							</span>
						</>
					) : (
						<div className="flex-col relative pb-10 px-2">
							{[
								{
									label: "نام شرکت",
									key: "name",
								},
								{
									label: "ایمیل",
									key: "email_address",
								},
								{
									label: "تلفن",
									key: "landline_phone_number",
								},
								{
									label: "موبایل",
									key: "mobile_phone_number",
								},
								{
									label: "آدرس",
									key: "address",
								},
							].map((item, index) => {
								return (
									<React.Fragment key={index}>
										<span className="text-stone-400">{item.label} : </span>
										<span className="text-lg">
											{company_info.thing.value[item.key]}
										</span>
										<br />
									</React.Fragment>
								);
							})}

							<div className="absolute bottom-0 right-0">
								<FollowUsRow
									className="px-0"
									instagram={company_info.thing.value.instagram}
									telegram={company_info.thing.value.telegram}
									twitter={company_info.thing.value.twitter}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
