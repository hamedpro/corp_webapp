import { HistoryEduRounded, Support } from "@mui/icons-material";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_collection } from "../../api/client";
import { customAjax } from "../custom_ajax";
import { CompanyInfo } from "./AboutUs/CompanyInfo";
import Section from "./section/comp";
import { StyledDiv } from "./styled_elements";
export function SupportMessageRow({ support_message }) {
	var sm = support_message;
	var nav = useNavigate();
	return (
		<div
			className="py-8 hover:bg-blue-700 duration-300 hover:text-white flex flex-col justify-center h-10 border border-blue-500 rounded my-2 px-2 cursor-pointer"
			onClick={() => nav(`/support_messages/${sm._id}`)}
		>
			<div className="flex">
				<HistoryEduRounded />
				<h1 className="text-xl">{sm.title}</h1>
			</div>
			<p className="text-sm mt-2">
				ثبت شده توسط {sm.username} | حدود{" "}
				{Math.round((new Date().getTime() - sm.date) / 3600000)} ساعت پیش
			</p>
		</div>
	);
}
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
		<Section title="ارتباط با ما" className="m-2">
			<CompanyInfo />
			<div className="p-2 m-2">
				<div className="flex justify-between mt-8">
					<h1 className="text-xl underline underline-offset-4">
						درخواست های پشتیبانی من{" "}
					</h1>
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
							<Fragment key={i}>
								{" "}
								<SupportMessageRow support_message={sm} />;
							</Fragment>
						);
					})
				)}
			</div>
		</Section>
	);
};
