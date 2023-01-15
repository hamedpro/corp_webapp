import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import LinkLikeP from "../LinkLikeP/comp.jsx";
import { Loading } from "../loading/comp.jsx";
import Section from "../section/comp";
import { StyledDiv } from "../styled_elements.jsx";
import { CompanyInfo } from "./CompanyInfo.jsx";
export default function AboutUs() {
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
	useEffect(get_data, []);
	return (
		<>
			<Section
				title={ml({
					en: "introducing the company ",
					fa: "اطلاعات شرکت",
				})}
				className="m-2"
			>
				<CompanyInfo />
				<Loading is_loading={company_info === null} />
				{company_info && (
					<Section
						title={ml({
							en: "story of the company",
							fa: "معرفی شرکت",
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
						<StyledDiv className="w-fit mt-2">
							<LinkLikeP link="/new-support-ticket">
								{ml({
									en: "opening a new support ticket",
									fa: "باز کردن یک درخواست پشتیبانی جدید",
								})}
							</LinkLikeP>
						</StyledDiv>
					</div>
				</Section>
			</Section>
		</>
	);
}
