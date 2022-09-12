import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { customAjax } from "../../../src/custom_ajax.js";
import { useEffect, useState } from "react";
import { LinkLikeP } from "../";
import { TopUi } from "./top_ui.jsx";
import { multi_lang_helper as ml } from "../../common.js";
export default function SubToEmailTab() {
	var [email_sub_status, set_email_sub_status] = useState(null); // not_logged_in , without_email , subscribed , ready
	var nav = useNavigate();
	function subscribe_to_email() {
		customAjax({
			params: {
				task_name: "sub_to_email",
				username: window.localStorage.getItem("username"),
			},
		})
			.then(
				(data) => {
					alert(
						ml({
							en: "subscription of email was done",
							fa: "عضویت در سرویس ایمیل انجام شد",
						})
					);
				},
				(error) => {
					alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
					console.log(error);
				}
			)
			.finally(sync_data);
	}
	function update_user_email(on_success = () => {}) {
		var entered_email = document.getElementById("email_subscription_input").value;
		customAjax({
			params: {
				task_name: "update_email",
				username: localStorage.getItem("username"),
				new_email: entered_email,
			},
		})
			.then(
				(data) => {
					alert(
						ml({
							en: "user email was changed successfuly",
							fa: "آدرس ایمیل کاربر با موفقیت تعویض شد",
						})
					);
					on_success();
					//todo suyc data after operations like update user email and ...
				},
				(error) => {
					alert(
						ml({
							en: "something went wrong",
							fa: "مشکلی رخ داد",
						})
					);
					console.log(error);
				}
			)
			.finally(sync_data);
	}
	function update_email_and_sub() {
		update_user_email(subscribe_to_email);
	}
	function sync_data() {
		if (window.localStorage.getItem("username") === null) {
			set_email_sub_status("not_logged_in");
			return;
		}
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then((data) => {
			var user = data.result.filter(
				(user) => user.username == window.localStorage.getItem("username")
			)[0];
			var has_email = user["email"] !== null;
			if (!has_email) {
				set_email_sub_status("without_email");
				return;
			}
			if (user["is_subscribed_to_email"] == "true") {
				set_email_sub_status("subscribed");
				return;
			}
			set_email_sub_status("ready");
		});
	}
	//todo : update it when user does login or anything related to it changes
	//window.setInterval(sync_data, 10000);
	useEffect(() => {
		sync_data();
	}, []);
	return (
		<div className="w-3/4 mx-auto pb-2">
			<TopUi
				title={ml({ en: "subscribe to email", fa: "عضویت در سرویس ایمیل" })}
				content={ml({
					en: `enter your email address if you want to get notified everytime we send offer
					suggesstions and news to the users`,
					fa: "در صورتی که تمایل دارید از پیشنهادات و اخبار سایت با خبر باشید آدرس ایمیل خود را وارد کنید",
				})}
			/>

			{email_sub_status == "without_email" ? (
				<>
					<input
						type="text"
						id="email_subscription_input"
						className="my-2 px-1 w-full text-black rounded"
						placeholder={ml({ en: "your email address", fa: "" })}
					/>

					<Button
						onClick={update_email_and_sub}
						variant="contained"
						sx={{ minHeight: 0, minWidth: 0, width: "100%" }}
						size="small"
					>
						{ml({
							en: "subscribe",
							fa: "عضویت",
						})}
					</Button>
				</>
			) : null}
			{email_sub_status == "not_logged_in" ? (
				<div className="flex flex-col justify-center items-center w-full mt-2">
					<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
						{ml({
							en: "subscribe as",
							fa: "عضویت به عنوان",
						})}{" "}
						@{localStorage.getItem("username")}
					</Button>
					<LinkLikeP className="text-red-600 text-sm" link="/login">
						{ml({
							en: "you should login first ->",
							fa: "ابتدا باید وارد حساب کاربری خود شوید",
						})}
					</LinkLikeP>
				</div>
			) : null}
			{email_sub_status == "ready" ? (
				<div className="flex flex-col justify-center items-center w-full mt-2 text-white">
					<Button
						variant="outlined"
						sx={{ mb: 1, color: "white", borderColor: "gray" }}
						color="primary"
						onClick={subscribe_to_email}
					>
						{ml({
							en: "subscribe as",
							fa: "عضویت به عنوان",
						})}{" "}
						@{localStorage.getItem("username")}
					</Button>
				</div>
			) : null}
			{email_sub_status == "subscribed" ? (
				<div className="flex flex-col justify-center items-center w-full mt-2">
					<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
						{ml({
							en: "subscribe as",
							fa: "عضویت به عنوان",
						})}{" "}
						@{localStorage.getItem("username")}
					</Button>
					<p className="text-green-600 text-sm">
						{ml({
							en: "you're already subscribed",
							fa: "شما همین الان عضو هستید",
						})}
					</p>
				</div>
			) : null}
		</div>
	);
}
