import { useNavigate } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
import { useState, useEffect } from "react";
import { BurstModeTwoTone } from "@mui/icons-material";
import { LinkLikeP } from "../";
export default function SubToSmsTab() {
	var [sms_sub_status, set_sms_sub_status] = useState(null); // not_logged_in , without_phone_number , subscripted , ready
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
				alert("done");
			},
			(error) => {
				alert("something went wrong");
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
				alert("updating phone number was successful");
				on_success();
				//todo suyc data after operations like update user email and ...
			},
			(error) => {
				alert("something went wrong when updating your email address");
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
				console.log("something went wrong when getting users information");
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<div className="border border-blue-400 rounded rounded mx-2 mb-2 px-4">
			<div className="mx-auto h-20 w-20 rounded-full bg-blue-400 mt-3 flex justify-center items-center">
				<NotificationsActiveRoundedIcon
					sx={{ width: "80%", height: "80%", color: "white" }}
				/>
			</div>
			<Typography variant="h4" sx={{ textAlign: "center" }}>
				subscribe to sms
			</Typography>
			<p style={{ textAlign: "center" }} className="text-stone-700">
				enter your phone number if you want to get notified everytime we send offer
				suggesstions and news to the users
			</p>
			<div className="flex items-center my-3">
				{sms_sub_status == "without_phone_number" ? (
					<>
						<div className="w-3/4">
							<TextField
								label="enter your phone number here"
								color="primary"
								id="phone_number_input"
							/>
						</div>
						<div className="w-1/4">
							<Button
								onClick={update_phone_number_and_sub}
								variant="contained"
								sx={{
									minHeight: 0,
									minWidth: 0,
									width: "100%",
									height: "100%",
								}}
								size="small"
							>
								subscribe
							</Button>
						</div>
					</>
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
							sx={{ mb: 1 }}
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
