import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import LinkLikeP from "../LinkLikeP/comp";
import "./styles.css";
import { Button } from "@mui/material";
import { ArrowCircleRightRounded } from "@mui/icons-material";
import { multi_lang_helper } from "../../common";
import { AppContext } from "../../AppContext";
export default () => {
	var ml = new multi_lang_helper(useContext(AppContext));
	var [userStatus, setUserStatus] = useState(null);
	var nav = useNavigate();
	var [users, set_users] = useState([]);
	var fetch_data = () => {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_users(data.result);
			},
			(error) => {
				alert(
					ml.render({
						en: "something went wrong \n -- task : fetching users \n * details are in console",
						fa: "",
					})
				);
				console.log(error);
			}
		);
		if (window.localStorage.getItem("username") === null) {
			setUserStatus("not_logged_in");
		} else {
			customAjax({
				params: { task_name: "get_users" },
			}).then(
				(data) => {
					setUserStatus(
						data.result.find(
							(user) => user.username == window.localStorage.getItem("username")
						)["is_admin"] == "true"
							? "admin"
							: "not_admin"
					);
				},
				(error) => {
					alert(
						ml.render({
							en: "something went wrong \n task: fetching users from server",
							fa: "",
						})
					);
					console.log(error);
				}
			);
		}
	};
	useEffect(fetch_data, []);
	if (userStatus == "not_logged_in") {
		return (
			<div className="border-stone-300 border mx-1 mt-2 p-2 flex justify-center items-center flex-col">
				<span className="text-lg">
					{ml.render({
						en: "you're not logged in",
						fa: "",
					})}
				</span>
				<span className="text-stone-500 text-center text-sm mb-2">
					{ml.render({
						en: "we can't determine if you have admin privileges or not",
						fa: "",
					})}
				</span>
				<Button
					color="primary"
					onClick={() => nav("/login")}
					variant="contained"
					size="small"
				>
					login
				</Button>
			</div>
		);
	}
	if (userStatus == "not_admin") {
		return (
			<div className="border-stone-300 border mx-1 mt-2 p-2 flex justify-center items-center flex-col">
				<span className="text-lg">
					{ml.render({
						en: "you have not admin privileges",
						fa: 00,
					})}
				</span>
				<span className="text-stone-500 text-center text-sm mb-2">
					this account has not admin privileges to access this part
				</span>
				<Button
					color="primary"
					onClick={() => nav("/login")}
					variant="contained"
					size="small"
				>
					{ml.render({
						en: "login with another account",
						fa: "",
					})}
				</Button>
			</div>
		);
	}
	if (userStatus == "admin") {
		return (
			<div className="border border-stone-300 mx-1 mt-2 p-2">
				<h1>
					{ml.render({
						en: "users :",
						fa: "",
					})}
				</h1>
				{users.map((user) => {
					return (
						<div
							key={user.id}
							onClick={() => nav("/users/" + user.username)}
							className="relative  p-2 cursor-pointer border border-blue-400 rounded mx-1 mt-2 text-sx hover:bg-blue-600 hover:text-blue-200 duration-300 users_page_user_item"
						>
							<h6>
								{ml.render({
									en: "user id:",
									fa: "",
								})}{" "}
								<span>{user.id}</span>
							</h6>
							<h6>
								{ml.render({
									en: "username:",
									fa: "",
								})}{" "}
								<span>{user.username}</span>
							</h6>
							<h6>
								{ml.render({
									en: "email:",
									fa: "",
								})}
								:{" "}
								<span>
									{user.email === null
										? ml.render({
												en: "not available",
												fa: "",
										  })
										: user.email}
								</span>
							</h6>
							<h6>
								{ml.render({
									en: "user phone number:",
									fa: "",
								})}{" "}
								<span>
									{user.phone_number === null
										? ml.render({ en: "not entered", fa: "" })
										: user.phone_number}
								</span>
							</h6>
							<h6>
								is_subscribed_to_email:
								<span>{user.is_subscribed_to_email}</span>
							</h6>
							<h6>
								is_subscribed_to_sms :<span>{user.is_subscribed_to_sms}</span>
							</h6>
							<div className="icon">
								<ArrowCircleRightRounded sx={{ color: "white" }} />
							</div>
						</div>
					);
				})}
			</div>
		);
	}
};
