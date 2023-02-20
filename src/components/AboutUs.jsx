import React from "react";
import { multi_lang_helper as ml } from "../common.js";
import { LinkLikeP } from "./LinkLikeP";
import { Section } from "./Section";
import { StyledDiv } from "./StyledElements.jsx";
import { CompanyInfo } from "./CompanyInfo.jsx";
export function AboutUs() {
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
