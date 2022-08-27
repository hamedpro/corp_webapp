import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { customAjax } from "../../../src/custom_ajax.js";
import { useState, useEffect, useContext } from "react";
import { LinkLikeP } from "../";
import { TopUi } from "./top_ui.jsx";
import { multi_lang_helper as ml } from "../../common.js";
import { AppContext } from "../../AppContext.js";
export default function SubToSmsTab() {
	var [sms_sub_status, set_sms_sub_status] = useState(null); // not_logged_in , without_phone_number , subscribed , ready
	var nav = useNavigate();
	//add fetch data interval for 1 sec / note 2 : note 1 is not good , think about a way to recalc data when something related does change
	function subscribe_to_sms() {
		customAjax({
			params: {
				task_name: "sub_to_sms",
				username: window.localStorage.getItem("username"),
			},
		}).then(
			(data) => {
				alert(ml({ en: "done", fa: "انجام شد" }));
			},
			(error) => {
				alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
				console.log(error);
			}
		);
	}
	function update_user_phone_number(on_success = () => {}) {
		var input_value = document.getElementById("phone_number_input").value;
		if (isNaN(Number(input_value))) {
			alert("given value as phone number is not a number");
			return;
		}
		customAjax({
			params: {
				task_name: "update_phone_number",
				username: localStorage.getItem("username"),
				new_phone_number: input_value,
			},
		}).then(
			(data) => {
				alert(
					ml({
						en: "updating phone number was successful",
						fa: "شماره تلفن کاربر با موفقیت تعویض شد",
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
		);
	}
	function update_phone_number_and_sub() {
		update_user_phone_number(subscribe_to_sms());
	}
	function fetch_data() {
		if (window.localStorage.getItem("username") === null) {
			set_sms_sub_status("not_logged_in");
			return;
		}
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				var users = data.result;
				var user = users.filter(
					(user) => user.username == window.localStorage.getItem("username")
				)[0];
				if (user.phone_number === null) {
					set_sms_sub_status("without_phone_number");
					return;
				}
				if (user.is_subscribed_to_sms == "true") {
					set_sms_sub_status("subscribed");
					return;
				}
				set_sms_sub_status("ready");
			},
			(error) => {
				console.log(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<div className="w-3/4 mx-auto ">
			<TopUi
				title="subscribe to sms"
				content="enter your phone number if you want to get notified everytime we send offer
			suggesstions and news to the users"
			/>
			<div className="flex items-center my-3">
				{sms_sub_status == "without_phone_number" ? (
					<div className="flex flex-col justify-center mx-auto">
						<input
							type="text"
							id="phone_number_input"
							placeholder="your phone number"
							className="px-1 w-full text-black rounded"
						/>

						<button
							onClick={update_phone_number_and_sub}
							className="w-full mt-2 bg-blue-400 rounded"
						>
							subscribe
						</button>
					</div>
				) : null}
				{sms_sub_status == "not_logged_in" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
							subscribe as @{localStorage.getItem("username")}
						</Button>
						<LinkLikeP className="text-red-600 text-sm" link="/login">
							{"you should login first ->"}
						</LinkLikeP>
					</div>
				) : null}
				{sms_sub_status == "ready" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button
							variant="outlined"
							sx={{ mb: 1, borderColor: "gray", color: "white" }}
							color="primary"
							onClick={subscribe_to_sms}
						>
							subscribe as @{localStorage.getItem("username")}
						</Button>
					</div>
				) : null}
				{sms_sub_status == "subscribed" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
							subscribe as @{localStorage.getItem("username")}
						</Button>
						<p className="text-green-600 text-sm">you're already subscribed</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
