import { SupportMessageRow } from "./SupportMessageRow";
import { CompanyInfo } from "./CompanyInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Section } from "./Section";
import { StyledDiv } from "./StyledElements";
import { Fragment } from "react";
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
		tmp = tmp.data;
		set_user_support_messages(tmp);
	}
	useEffect(() => {
		get_data();
	}, []);
	if (user_support_messages === null) return "loading ... ";
	return (
		<Section
			title="ارتباط با ما"
			className="m-2"
		>
			<CompanyInfo />
			<div className="p-2 m-2">
				<div className="flex justify-between mt-8">
					<h1 className="text-xl underline underline-offset-4">
						درخواست های پشتیبانی من{" "}
					</h1>
					<StyledDiv
						className="text-lg mt-2"
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
