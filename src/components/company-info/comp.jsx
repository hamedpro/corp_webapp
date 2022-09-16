import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import { ImageSlider } from "../image_slider/comp.jsx";
import LinkLikeP from "../LinkLikeP/comp.jsx";
import { Loading } from "../loading/comp.jsx";
import Section from "../section/comp";
export default function CompanyInfo() {
	var [company_info, set_company_info] = useState(null);
	function get_data() {
		customAjax({
			params: {
				task_name: "get_company_info",
			},
		}).then(
			(data) => {
				set_company_info(JSON.parse(data.result));
			},
			(e) => {
				if (e.errors[0].code === 1) {
					console.log("company info is not set yet");
				} else {
					console.log(e);
				}
			}
		);
	}
	var [rectangle_icon_src, set_rectangle_icon_src] = useState(null);
	useEffect(() => {
		console.log(company_info);
	}, [company_info]);
	useEffect(() => {
		get_data();
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
		<>
			<Section
				title={ml({
					en: "introducing the company ",
					fa: "معرفی شرکت",
				})}
				className="m-2"
			>
				<div className="flex flex-col md:flex-row">
					<div className="flex md:w-1/2 w-full px-2">
						<Loading is_loading={rectangle_icon_src === null}>
							<ImageSlider image_sources={[rectangle_icon_src]} />
						</Loading>
					</div>
					<div className="md:w-1/2 w-full">
						<Loading is_loading={company_info === null} />
						{company_info !== null && (
							<div className="m-2 p-1 flex-col">
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
									{
										label: ml({ en: "telegram id", fa: "آیدی تلگرام" }),
										key: "telegram",
									},
									{
										label: ml({ en: "instagram id", fa: "آیدی اینستاگرام" }),
										key: "instagram",
									},
									{
										label: ml({ en: "twitter", fa: "آیدی توییتر" }),
										key: "twitter",
									},
								].map((item, index) => {
									return (
										<React.Fragment key={index}>
											<span className="text-stone-600 text-sm">
												{item.label} :{" "}
											</span>
											<span>{company_info[item.key]}</span>
											<br />
										</React.Fragment>
									);
								})}
							</div>
						)}
					</div>
				</div>
				<Loading is_loading={company_info === null} />
				{company_info && (
					<Section
						title={ml({
							en: "story of the company",
							fa: "داستان شرکت",
						})}
						className="mx-2"
					>
						<div className="px-2">{company_info.history}</div>
					</Section>
				)}

				<Section
					title={ml({
						en: "contact the support",
						fa: "ارتباط با پشتیبانی",
					})}
					className="px-2 mt-2"
				>
					<div className="p-2">
						<h1>
							{ml({
								en: `if you have any issue about using our website or there is any question
								about our company you can either call one of the given phone numbers or
								simply open a new support ticket :`,
								fa: "اگر هر مساله یا سوالی در مورد سایت ما دارید یا با یکی از شماره تلفن های داده شده تماس بگیرید یا به راحتی یک درخواست پشتیبانی جدید باز کنید :",
							})}
						</h1>
						<LinkLikeP link="/new-support-ticket">
							{ml({
								en: "opening a new support ticket",
								fa: "باز کردن یک درخواست پشتیبانی جدید",
							})}
						</LinkLikeP>
					</div>
				</Section>
			</Section>
		</>
	);
}
