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
			(error) => {
				console.log(error);
			}
		);
	}
	var [rectangle_icon_src, set_rectangle_icon_src] = useState(null);
	useEffect(() => {
		get_data();
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then((data) => {
			set_rectangle_icon_src(
				gen_link_to_file(
					"./company_info/" +
						data.result.filter((item) => item.split(".")[0] === "rectangle")[0]
				)
			);
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
						<Loading is_loading={company_info === null}>
							<div className="m-2 p-1 flex-col">
								{[
									{
										label: "company name",
										key: "name",
									},
									{
										label: "company description",
										key: "description",
									},
									{
										label: "email address",
										key: "email_address",
									},
									{
										label: "landline phone number",
										key: "landline_phone_number",
									},
									{
										label: "mobile phone number",
										key: "mobile_phone_number",
									},
									{
										label: "address",
										key: "address",
									},
									{
										label: "telegram id",
										key: "telegram",
									},
									{
										label: "instagram id",
										key: "instagram",
									},
									{
										label: "twitter",
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
						</Loading>
					</div>
				</div>
				<Loading is_loading={company_info === null}>
					<Section title={"story of the company"} className="mx-2">
						<div className="px-2">{company_info.history}</div>
					</Section>
				</Loading>
				<Section title="contact the supprt" className="px-2 mt-2">
					<div className="p-2">
						<h1>
							if you have any issue about using our website or there is any question
							about our company you can either call one of the given phone numbers or
							simply open a new support ticket :
						</h1>
						<LinkLikeP link="/new-support-ticket">
							opening a new support ticket
						</LinkLikeP>
					</div>
				</Section>
			</Section>
		</>
	);
}
