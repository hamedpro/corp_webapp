import { useNavigate } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { customAjax } from "../../../src/custom_ajax.js";
import { useEffect, useState } from "react";
import { BurstModeTwoTone } from "@mui/icons-material";
import { LinkLikeP } from "../";
export default function SubToEmailTab() {
	var [email_sub_status, set_email_sub_status] = useState(null); // not_logged_in , without_email , subscripted , ready
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
					alert("subscription of email was done");
				},
				(error) => {
					alert("something went wrong");
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
					alert("user email was changed successfuly");
					on_success();
					//todo suyc data after operations like update user email and ...
				},
				(error) => {
					alert("something went wrong when updating your email address");
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
		<>
			<div className="mx-auto h-20 w-20 rounded-full bg-blue-400 mt-3 flex justify-center items-center">
				<NotificationsActiveRoundedIcon
					sx={{ width: "80%", height: "80%", color: "white" }}
				/>
			</div>
			<Typography variant="h4" sx={{ textAlign: "center" }}>
				subscribe to email
			</Typography>
			<p style={{ textAlign: "center" }} className="text-stone-700">
				enter your email address if you want to get notified everytime we send offer
				suggesstions and news to the users
			</p>
			<div className="flex items-center my-3">
				{email_sub_status == "without_email" ? (
					<>
						<div className="w-3/4">
							<TextField
								label="your email address"
								color="primary"
								id="email_subscription_input"
							/>
						</div>
						<div className="w-1/4">
							<Button
								onClick={update_email_and_sub}
								variant="contained"
								sx={{ minHeight: 0, minWidth: 0, width: "100%", height: "100%" }}
								size="small"
							>
								subscribe
							</Button>
						</div>
					</>
				) : null}
				{email_sub_status == "not_logged_in" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
							subscribe as @{localStorage.getItem("username")}
						</Button>
						<LinkLikeP className="text-red-600 text-sm" link="/login">
							{"you should login first ->"}
						</LinkLikeP>
					</div>
				) : null}
				{email_sub_status == "ready" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button
							variant="outlined"
							sx={{ mb: 1 }}
							color="primary"
							onClick={subscribe_to_email}
						>
							subscribe as @{localStorage.getItem("username")}
						</Button>
					</div>
				) : null}
				{email_sub_status == "subscribed" ? (
					<div className="flex flex-col justify-center items-center w-full">
						<Button variant="outlined" sx={{ mb: 1 }} disabled color="primary">
							subscribe as @{localStorage.getItem("username")}
						</Button>
						<p className="text-green-600 text-sm">you're already subscribed</p>
					</div>
				) : null}
			</div>
		</>
	);
}
