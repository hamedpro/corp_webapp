import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_collection } from "../../api/client";
import { customAjax } from "../custom_ajax";
import { CompanyInfo } from "./AboutUs/CompanyInfo";
import Section from "./section/comp";
import { StyledDiv } from "./styled_elements";

export const ContactUs = () => {
	var nav = useNavigate();
	var [user_support_messages, set_user_support_messages] = useState(null);
	async function get_data() {
		var tmp = await get_collection({
			collection_name: "support_messages",
			filters: {
				username: localStorage.getItem("username"),
			},
		});
		set_user_support_messages(tmp);
	}
	useEffect(() => {
		get_data();
	}, []);
	if (user_support_messages === null) return "loading ... ";
	return (
		<Section title="ارتباط با ما">
			<CompanyInfo />
			<div className="p-2 m-2">
				<div className="flex justify-between">
					<h1 className="text-xl">درخواست های پشتیبانی من </h1>
					<StyledDiv
						className="text-lg"
						onClick={() => {
							nav("/new-support-message");
						}}
					>
						ثبت درخواست جدید
					</StyledDiv>
				</div>
				{localStorage.getItem("username") === null ? (
					<h1>شما هنوز وارد هیچ حساب کاربری ای نشده اید</h1>
				) : user_support_messages.length === 0 ? (
					<h1>هنوز هیچ درخواست پشتیبانی ای ثبت نکرده اید </h1>
				) : (
					user_support_messages.map((sm, i) => {
						return (
							<h1 key={i} onClick={() => nav(`/support_messages/${sm._id}`)}>
								یک درخواست پشتیبانی با عنوان {sm.title}
							</h1>
						);
					})
				)}
			</div>
		</Section>
	);
};
